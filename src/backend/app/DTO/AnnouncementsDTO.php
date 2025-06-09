<?php

namespace app\DTO;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class AnnouncementsDTO
{
    const SLIDER_MAX_ITEMS = 3;
    public readonly Collection $todayEvents;
    public readonly Collection $todayQuizzes;
    public readonly Collection $sliderEvents;

    private function __construct(Collection $todayEvents, Collection $todayQuizzes, Collection $sliderEvents) {
        $this->todayEvents = $todayEvents;
        $this->todayQuizzes = $todayQuizzes;
        $this->sliderEvents = $sliderEvents;
    }

    public static function fromCollection(Collection $announcements): static
    {
        $today = Carbon::now();
        $nextWeek = Carbon::now()->addWeek();

        $sliderEvents = $announcements->filter(function ($item) {
            return Carbon::parse($item->date_start)->isSameDay(Carbon::now());
        })->values()->take(self::SLIDER_MAX_ITEMS);

        $todayEvents = $announcements->filter(function ($item) {
            return Carbon::parse($item->date_start)->isSameDay(Carbon::now()) && $item->type == 'default';
        })->values();

        $todayQuizzes = $announcements->filter(function ($item) use ($nextWeek, $today) {
            $itemDate = Carbon::parse($item->date_start);
            return $itemDate->isSameDay($today) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek)) && $item->type == 'quiz';
        })->values();


        return new static($todayEvents, $todayQuizzes, $sliderEvents);
    }
}
