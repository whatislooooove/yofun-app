<?php

namespace app\DTO;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class AnnouncementsDTO
{
    const int SLIDER_MAX_ITEMS = 3;
    const int BLOCK_MAX_ITEMS = 8;
    public readonly Collection $upcomingEvents;
    public readonly Collection $upcomingQuizzes;
    public readonly Collection $sliderEvents;

    private function __construct(Collection $upcomingEvents, Collection $upcomingQuizzes, Collection $sliderEvents) {
        $this->upcomingEvents = $upcomingEvents;
        $this->upcomingQuizzes = $upcomingQuizzes;
        $this->sliderEvents = $sliderEvents;
    }

    public static function fromCollection(Collection $announcements): static
    {
        $today = Carbon::now();
        $nextWeek = Carbon::now()->addWeek();

        $sliderEvents = $announcements->filter(function ($item) use ($today, $nextWeek) {
            $itemDate = Carbon::parse($item->date_start);
            return $itemDate->isSameDay($today) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek));
        })->values()->take(self::SLIDER_MAX_ITEMS);

        $upcomingEvents = $announcements->filter(function ($item) use ($today, $nextWeek) {
            $itemDate = Carbon::parse($item->date_start);
            return $itemDate->isSameDay($today) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek)) && $item->type == 'default';
        })->values()->take(self::BLOCK_MAX_ITEMS);

        $upcomingQuizzes = $announcements->filter(function ($item) use ($nextWeek, $today) {
            $itemDate = Carbon::parse($item->date_start);
            return $itemDate->isSameDay($today) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek)) && $item->type == 'quiz';
        })->values()->take(self::BLOCK_MAX_ITEMS);


        return new static($upcomingEvents, $upcomingQuizzes, $sliderEvents);
    }
}
