<?php

namespace App\Crawlers;

use App\Contracts\AI\AI;
use app\Crawlers\Social\VKParser;
use App\Models\Announcement;
use App\Models\Source;
use App\Utilities\AI\PromptPreparator;

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

    protected function getAIHandledData(array $rawData): array {
        $method = $this->getPromptPreparatorMethod($this);
        $prompt = app(PromptPreparator::class)->$method($rawData);

        $mistralResponse = app(AI::class)->sendMessage($prompt);
        $preparedToArray = str_replace(['```json', '```'], ['', ''], $mistralResponse->message);

        return json_decode(is_array($preparedToArray) ? $preparedToArray[0] : $preparedToArray, true);
    }

    protected abstract function getAnnouncementDetail(array $rawData);

    private function getPromptPreparatorMethod(AbstractParser $concreteParser): string {
        return match ($concreteParser::class) {
            VKParser::class => 'findAnnouncementVK',
            default => 'findAnnouncementOther'
        };
    }
}
