<?php

namespace App\Helpers;

use App\Enums\HostsParsers;
use App\Models\Source;

class SourceHelper
{
    const SOURCE_EXIST_MESSAGE = 'Source exist';
    const PARSERS_NAMESPACE = 'App\Parsers\\';
    public static function addNewSource(string $url): bool|string
    {
        $parser = match (parse_url($url)['host']) {
            HostsParsers::VKParser->value => self::PARSERS_NAMESPACE . HostsParsers::VKParser->name,
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

    public static function parseSource(Source $source, string $keyUrl): void {
        echo 'Parsing ' . $keyUrl . '...' . PHP_EOL;

        $parserName = $source['parser'];
        $parser = new $parserName($keyUrl);
        $parser->run();
    }
}
