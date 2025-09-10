<?php

namespace App\Helpers;

use App\Models\Source;

final class SourceHelper
{
    public static function addNewSource(string $url, string $parser): bool|string
    {
        if (!is_null(Source::where('url', $url)->first())) {
            return __('console.sources.exist');
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
