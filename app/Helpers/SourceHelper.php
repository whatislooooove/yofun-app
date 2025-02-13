<?php

namespace App\Helpers;

use App\Models\Source;

class SourceHelper
{
    const SOURCE_EXIST_MESSAGE = 'Source exist';
    public static function addNewSource(string $url): bool|string
    {
        $parser = match (parse_url($url)['host']) {
            HostsParsers::VKParser->value => HostsParsers::VKParser->name,
            default => 'DefaultParser'
        };

        if (!is_null(Source::where('url', $url)->first())) {
            return self::SOURCE_EXIST_MESSAGE;
        }

        Source::create([
            'url' => $url,
            'parser' => $parser,
            'is_active' => true
        ]);

        return true;
    }
}
