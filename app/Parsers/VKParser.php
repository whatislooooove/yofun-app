<?php

namespace App\Parsers;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Enums\Prompts;
use App\Helpers\MistralAIHelper;
use App\Models\Announcement;
use App\Models\Source;
use Illuminate\Support\Carbon;
use VK\Client\VKApiClient;

#[AllowDynamicProperties] class VKParser extends AbstractParser
{
    private array $posts;
    private Source $source;
    public function __construct(string $url)
    {
        //TODO: если будет много манипуляций с урлами, вынести в отдельный хелпер
        $this->vkApi = new VKApiClient();
        $this->url = ltrim(parse_url($url)['path'], '/');
        $this->posts = [];
        $this->source = Source::where('url', $url)->first();
        if (is_array($this->source['extra']) && !array_key_exists('groupId', $this->source['extra']) || !$this->source['extra']) {
            $this->source['extra'] = $this->getGroupInfo();
            $this->source->save();
        }
    }

    protected function getContent(): void
    {
        $response = $this->vkApi->wall()->get(env('VK_API_ACCESS_TOKEN'), [
            'owner_id' => $this->source['extra']['groupId'],
            'count' => 10
        ]);

        if (array_key_exists('currentCount', $this->source['extra'])) {
            $this->posts = ($this->source['extra']['currentCount'] < $response['count'])
                ? array_slice($response['items'], 0, $response['count'] - $this->source['extra']['currentCount'] + 1)
                : [];
        } else {
            $this->posts = $response['items'];
        }

        $extra = [
            'currentCount' => $response['count'],
        ];

        $this->source['extra'] = array_merge($this->source['extra'], $extra);
        $this->source->save();
    }

    protected function parseContent(): void
    {
        foreach ($this->posts as $post) {
            //----------------------------------------------------------------------------------------------------------
            //TODO: надо будет переписать нормально
            $mistralResponse = MistralAIHelper::simpleRequest(Prompts::ParseContent->value . $post['text'] . '. Дата написания исходного текста - ' . gmdate('d.m.Y H:i:s', $post['date']));
            $preparedToArray = str_replace(['```json', '```'], ['', ''], $mistralResponse['response']);
            $preparedAiData = json_decode(is_array($preparedToArray) ? $preparedToArray[0] : $preparedToArray, true);
            //----------------------------------------------------------------------------------------------------------
            if (!$mistralResponse['isSuccess']
                || !data_get($preparedAiData, 'isEvent')
                || time() > Carbon::createFromFormat('Y.m.d H:i', $preparedAiData['dateTime'])->timestamp
                || is_null($preparedAiData)){
                continue;
            }

            Announcement::create([
                'source_id' => $this->source->id,
                'id_in_source' => $post['id'],
                'title' => $preparedAiData['title'],
                'description' => $preparedAiData['description'],
                'type' => 'default',
                'address' => $preparedAiData['address'],
                'img' => data_get($post, 'attachments.0.photo.orig_photo.url'),
                'latitude' => $post['geo']['place']['latitude'],
                'longitude' => $post['geo']['place']['longitude'],
                'date_start' => $preparedAiData['dateTime'],
                'extra' => [
                    'publishDate' => gmdate('Y.m.d H:i:s', $post['date']),
                    'editDate' => data_get($post, 'edited') ? gmdate('Y.m.d H:i:s', $post['edited']) : null,
                    'views' => $post['views']['count'],
                    'sourceText' =>  $post['text']
                ]
            ]);
        }

        echo '\'' . $this->url . '\' - parsing is done.' . PHP_EOL;
    }

    private function getGroupId(): int {
        $response = $this->vkApi
            ->utils()
            ->resolveScreenName(env('VK_API_ACCESS_TOKEN'), [
                    'screen_name' => $this->url
                ]
            );

        return $response['object_id'];
    }

    private function getGroupInfo(): array
    {
        $response = $this->vkApi->groups()->getById(env('VK_API_ACCESS_TOKEN'), [
            'group_id' => $this->getGroupId(),
            'fields' => 'site,phone'
        ]);

        return [
            'groupId' => -$response[0]['id'],
            'name' => $response[0]['name'],
            'site' => $response[0]['site'],
            'phone' => $response[0]['phone'],
            'image' => data_get($response, '0.photo_200') ?? data_get($response, '0.photo_100') ?? data_get($response, '0.photo_50') ?? null,
        ];
    }
}
