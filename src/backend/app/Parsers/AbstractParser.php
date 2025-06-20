<?php

namespace App\Parsers;

use App\Models\Announcement;

abstract class AbstractParser implements IParser
{
    protected string $url;
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
