<?php

namespace app\Crawlers\Social;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Crawlers\AbstractParser;
use App\Enums\HostsParsers;
use App\Models\Announcement;
use App\Models\Source;
use app\Repositories\AnnouncementRepository;
use app\Traits\Crawlers\LoggableCrawler;
use Illuminate\Support\Carbon;
use VK\Client\VKApiClient;

#[AllowDynamicProperties] final class VKParser extends AbstractParser
{
    use LoggableCrawler;

    protected Source $source;
    private array $posts;

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
        $response = $this->vkApi->wall()->get(config('services.vk.api_token'), [
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
            $resultData = $this->getAnnouncementDetail($post);
            if (!is_null(app(AnnouncementRepository::class)->getByExternalId($post['id']))) {
                continue;
            }

            $preparedAiData = $this->getAIHandledData($post);

            if (!data_get($preparedAiData, 'isEvent')
                || !$preparedAiData['dateTime']
                || time() > Carbon::parse(str_replace('.', '-', $preparedAiData['dateTime']))->timestamp
                || Announcement::where('id_in_source', $post['id'])->exists()){
                continue;
            }

            $current = app(AnnouncementRepository::class)->create(array_merge($preparedAiData, $resultData));
            $this->setSavedAnnouncements($current);
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
            'address' => data_get($address, 'items.0.address') ?? 'г. Йошкар-Ола',
            'additionalAddress' => data_get($address, 'items.0.additional_address'),
            'defaultLatitude' => data_get($address, 'items.0.latitude') ?? 0,
            'defaultLongitude' => data_get($address, 'items.0.longitude') ?? 0
        ];
    }

    protected function getAnnouncementDetail(array $rawData): array
    {
        return [
            'source_id' => $this->source->id,
            'id_in_source' => $rawData['id'],
            'type' => 'default',
            'image' => data_get($rawData, 'attachments.0.photo.orig_photo.url') ?? data_get($this->source->extra, 'image'),
            'detail_url' => HostsParsers::VKParser->value . '/wall' . $this->source['extra']['groupId'] . '_' . $rawData['id'],
            'extra' => [
                'publishDate' => gmdate('Y.m.d H:i:s', $rawData['date']),
                'editDate' => data_get($rawData, 'edited') ? gmdate('Y.m.d H:i:s', $rawData['edited']) : null,
                'views' => $rawData['views']['count'],
                'additional_address' => $this->source->extra['additionalAddress'],
                'sourceText' => $rawData['text']
            ]
        ];
    }
}
