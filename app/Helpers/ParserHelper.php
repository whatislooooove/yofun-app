<?php

namespace App\Helpers;

use App\Enums\HostsParsers;
use Illuminate\Support\Facades\File;

final class ParserHelper
{
    const PARSERS_NAMESPACE = 'App\Parsers\\';
    const EXCLUDED_PARSERS_FOR_CHOOSE = [
        'IParser.php',
        'AbstractParser.php',
        'VKParser.php',
        'TGParser.php'
    ];
    public static function isSpecificSource(string $url): string|bool {
        return match (parse_url($url)['host']) {
            HostsParsers::VKParser->value => self::PARSERS_NAMESPACE . HostsParsers::VKParser->name,
            default => true
        };
    }
    public static function getParsersList(): array {
        $actualParsers = array_values(array_filter(File::allFiles('app/Parsers'), function ($item) {
            if (!in_array($item->getRelativePathname(), self::EXCLUDED_PARSERS_FOR_CHOOSE)) {
                return $item->getPathname();
            }
        }));

        return array_map(function ($item) {
            return ucfirst(str_replace(['.php', '/'], ['', '\\'], $item->getPathName()));
        }, $actualParsers);
    }
}
