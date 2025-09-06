<?php

namespace app\DTO;

use App\Http\Resources\AnnouncementResource;
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

        $sliderEvents = $announcements->filter(function ($item) use ($today) {
            $itemDate = Carbon::parse($item->date_start);
            return ($itemDate->isToday() && $itemDate->gt($today)) || ($itemDate->isAfter($today));
        })->values()
            ->sortBy('date_start')
            ->take(self::SLIDER_MAX_ITEMS);

        $upcomingEvents = $announcements->filter(function ($item) use ($today) {
            $itemDate = Carbon::parse($item->date_start);
            return (($itemDate->isToday() && $itemDate->gt($today)) || ($itemDate->isAfter($today))) && $item->type == 'default';
        })->values()
            ->sortBy('date_start')
            ->take(self::BLOCK_MAX_ITEMS);

        $upcomingQuizzes = $announcements->filter(function ($item) use ($today) {
            $itemDate = Carbon::parse($item->date_start);
            return (($itemDate->isToday() && $itemDate->gt($today)) || ($itemDate->isAfter($today))) && $item->type == 'quiz';
        })->values()
            ->sortBy('date_start')
            ->take(self::BLOCK_MAX_ITEMS);

        $meta = self::generateMeta();

        return new static($upcomingEvents, $upcomingQuizzes, $sliderEvents, $meta);
    }

    public function toArray(): array {
        return [
            'sliderEvents' => AnnouncementResource::collection($this->sliderEvents),
            'upcomingEvents' => AnnouncementResource::collection($this->upcomingEvents),
            'upcomingQuizzes' => AnnouncementResource::collection($this->upcomingQuizzes),
            'meta' => $this->meta
        ];
    }

    private static function generateMeta(): array {
        return [
            'todayEvents' => (new Announcement)->countToday(),
            'totalEvents' => (new Announcement)->countTotal()
        ];
    }
}
