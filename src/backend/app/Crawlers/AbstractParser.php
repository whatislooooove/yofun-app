<?php

namespace App\Crawlers;

use App\Models\Announcement;
use App\Models\Source;

abstract class AbstractParser implements IParser
{
    protected string $url;
    protected Source $source;
    protected array $savedAnnouncements = [];

    abstract protected function getContent();
    abstract protected function parseContent();

    public function run(): void
    {
        $this->getContent();
        $this->parseContent();
    }

    protected function setSavedAnnouncements(Announcement $object) {
        $this->savedAnnouncements[] = [
            'title' => $object->title,
            'date_start' => $object->date_start,
            'detail_url' => $object->detail_url,
        ];
    }
}
