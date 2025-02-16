<?php

namespace App\Parsers;

use App\Models\Source;
use App\Parsers\AbstractParser;
use VK\Client\VKApiClient;

class VKParser extends AbstractParser
{
    private array $posts;
    private Source $source;
    public function __construct(string $url)
    {
        //TODO: если будет много манипуляций с урлами, вынести в отдельный хелпер
        $this->url = ltrim(parse_url($url)['path'], '/');
        $this->source = Source::where('url', $url)->first();
        $this->posts = [];
    }

    protected function getContent(): void
    {
        $vk = new VKApiClient();

        $response = $vk->wall()->get(env('VK_API_ACCESS_TOKEN'), [
            'domain' => $this->url,
            'count' => 10
        ]);

        if (!$this->source['extra'] || $this->source['extra']['currentCount'] < $response['count']) {
            $this->posts = is_array($this->source['extra']) && array_key_exists('currentCount', $this->source['extra'])
                ? array_slice($response['items'], 0, $response['count'] - $this->source['extra']['currentCount'] + 1)
                : $response['items'];
            $this->source['extra'] = [
                'currentCount' => $response['count']
            ];
            $this->source->save();
        }
    }

    protected function parseContent()
    {
        // TODO: Implement parseContent() method.
        echo 'parse content in ' . $this->url . PHP_EOL;
    }
}
