<?php

namespace App\Parsers;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Enums\HostsParsers;
use App\Enums\Prompts;
use App\Helpers\MistralAIHelper;
use App\Models\Announcement;
use App\Models\Source;
use App\Traits\LoggableCrawler;
use Illuminate\Support\Carbon;
use VK\Client\VKApiClient;

#[AllowDynamicProperties] class VKParser extends AbstractParser
{
    use LoggableCrawler;
    private array $posts;
    private Source $source;
    public function __construct(string $url)
    {
        //TODO: если будет много манипуляций с урлами, вынести в отдельный хелпер
        $this->vkApi = new VKApiClient();
        $this->url = $url;
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
            if (data_get($post, 'is_pinned', false)) {
                continue;
            }

            //----------------------------------------------------------------------------------------------------------
            //TODO: надо будет переписать нормально
            $mistralResponse = MistralAIHelper::simpleRequest(Prompts::ParseContent->value . $post['text'] . '. Дата написания исходного текста - ' . gmdate('d.m.Y H:i:s', $post['date']));
            $preparedToArray = str_replace(['```json', '```'], ['', ''], $mistralResponse['response']);
            $preparedAiData = json_decode(is_array($preparedToArray) ? $preparedToArray[0] : $preparedToArray, true);
            //----------------------------------------------------------------------------------------------------------
            if (!$mistralResponse['isSuccess']
                || !data_get($preparedAiData, 'isEvent')
                || !$preparedAiData['dateTime']
                || time() > Carbon::parse(str_replace('.', '-', $preparedAiData['dateTime']))->timestamp
                || is_null($preparedAiData)
                || Announcement::where('id_in_source', $post['id'])->exists()){
                continue;
            }

            $info = Announcement::updateOrCreate([
                'source_id' => $this->source->id,
                'date_start' => $preparedAiData['dateTime'],
            ],[
                'id_in_source' => $post['id'],
                'title' => $preparedAiData['title'],
                'description' => $preparedAiData['description'],
                'type' => 'default',
                'address' => $preparedAiData['address'] ?: $this->source->extra['address'],
                'img' => data_get($post, 'attachments.0.photo.orig_photo.url'),
                'latitude' => data_get($post, 'geo.place.latitude') ?? $this->source->extra['defaultLatitude'],
                'longitude' => data_get($post, 'geo.place.longitude') ?? $this->source->extra['defaultLongitude'],
                'date_start' => $preparedAiData['dateTime'],
                'price' => data_get($preparedAiData, 'price') ?? 0,
                'detail_url' => HostsParsers::VKParser->value . '/wall' . $this->source['extra']['groupId'] . '_' . $post['id'],
                'extra' => [
                    'publishDate' => gmdate('Y.m.d H:i:s', $post['date']),
                    'editDate' => data_get($post, 'edited') ? gmdate('Y.m.d H:i:s', $post['edited']) : null,
                    'views' => $post['views']['count'],
                    'additional_address' => $this->source->extra['additionalAddress'],
                    'sourceText' => $post['text']
                ]
            ]);

            $this->setSavedAnnouncements($info);
        }
    }

    private function getGroupId(): int {
        $response = $this->vkApi
            ->utils()
            ->resolveScreenName(env('VK_API_ACCESS_TOKEN'), [
                    'screen_name' => ltrim(parse_url($this->url)['path'], '/')
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
        $address = $this->vkApi->groups()->getAddresses(env('VK_API_ACCESS_TOKEN'), [
            'group_id' => $this->getGroupId(),
        ]);

        return [
            'groupId' => -$response[0]['id'],
            'name' => data_get($response, '0.name'),
            'site' => data_get($response, '0.site'),
            'phone' => data_get($response, '0.phone'),
            'image' => data_get($response, '0.photo_200') ?? data_get($response, '0.photo_100') ?? data_get($response, '0.photo_50') ?? null,
            'address' => data_get($address, 'items.0.address'),
            'additionalAddress' => data_get($address, 'items.0.additional_address'),
            'defaultLatitude' => data_get($address, 'items.0.latitude') ?? 0,
            'defaultLongitude' => data_get($address, 'items.0.longitude') ?? 0
        ];
    }
}
