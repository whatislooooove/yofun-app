<?php

namespace App\Utilities\AI;

use app\Enums\AI\Prompts;

class PromptPreparator
{
    public function findAnnouncementVK(array $context): string {
        return Prompts::ParseContent->value
            . $context['text']
            . '. Дата написания исходного текста - '
            . gmdate('d.m.Y H:i:s', $context['date']);
    }

    public function findAnnouncementOther(array $context): string {
        return Prompts::PrepareQuizData->value . json_encode($context);
    }
}
