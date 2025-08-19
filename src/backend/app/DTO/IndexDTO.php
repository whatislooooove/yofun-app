<?php

namespace app\DTO;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class IndexDTO
{
    const int SLIDER_MAX_ITEMS = 3;
    const int BLOCK_MAX_ITEMS = 8;
    public readonly Collection $upcomingEvents;
    public readonly Collection $upcomingQuizzes;
    public readonly Collection $sliderEvents;

    public readonly array $meta;

    /**
     * @param Collection $upcomingEvents
     * @param Collection $upcomingQuizzes
     * @param Collection $sliderEvents
     * @param array $meta - Надо будет сделать поприличнее
     */
    private function __construct(Collection $upcomingEvents, Collection $upcomingQuizzes, Collection $sliderEvents, array $meta) {
        $this->upcomingEvents = $upcomingEvents;
        $this->upcomingQuizzes = $upcomingQuizzes;
        $this->sliderEvents = $sliderEvents;
        $this->meta = $meta;
    }

    public static function fromCollection(Collection $announcements): static
    {
        $today = Carbon::now();
        $nextWeek = Carbon::now()->addWeek();

        $sliderEvents = $announcements->filter(function ($item) use ($today, $nextWeek) {
            $itemDate = Carbon::parse($item->date_start);
            return ($itemDate->isToday() && $itemDate->gt($today)) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek));
        })->values()
            ->sortBy('date_start')
            ->take(self::SLIDER_MAX_ITEMS);

        $upcomingEvents = $announcements->filter(function ($item) use ($today, $nextWeek) {
            $itemDate = Carbon::parse($item->date_start);
            return (($itemDate->isToday() && $itemDate->gt($today)) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek))) && $item->type == 'default';
        })->values()
            ->sortBy('date_start')
            ->take(self::BLOCK_MAX_ITEMS);

        $upcomingQuizzes = $announcements->filter(function ($item) use ($nextWeek, $today) {
            $itemDate = Carbon::parse($item->date_start);
            return (($itemDate->isToday() && $itemDate->gt($today)) || ($itemDate->isAfter($today) && $itemDate->isBefore($nextWeek))) && $item->type == 'quiz';
        })->values()
            ->sortBy('date_start')
            ->take(self::BLOCK_MAX_ITEMS);

        $meta = self::generateMeta();

        return new static($upcomingEvents, $upcomingQuizzes, $sliderEvents, $meta);
    }

    private static function generateMeta(): array {
        return [
            'todayEvents' => (new Announcement)->countToday(),
            'totalEvents' => (new Announcement)->countTotal()
        ];
    }
}
