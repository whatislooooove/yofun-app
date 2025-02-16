<?php

namespace App\Parsers;

use AllowDynamicProperties;
use App\Models\Source;
use App\Parsers\AbstractParser;
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
            $this->source['extra'] = ['groupId' => -$this->getGroupId()];
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
        dd($this->posts);
    }

    protected function parseContent()
    {
        // TODO: Implement parseContent() method.
        echo 'parse content in ' . $this->url . PHP_EOL;
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
}
