<?php

namespace App\Helpers;

use App\Models\Source;

final class SourceHelper
{
    const SOURCE_EXIST_MESSAGE = 'Source exist';
    public static function addNewSource(string $url, string $parser): bool|string
    {
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
        $parserName = $source['parser'];
        $parser = new $parserName($keyUrl);
        $parser->run();
    }
}
