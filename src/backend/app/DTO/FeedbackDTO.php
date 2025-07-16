<?php

namespace app\DTO;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class FeedbackDTO
{
    /**
     * @param Collection $upcomingEvents
     * @param Collection $upcomingQuizzes
     * @param Collection $sliderEvents
     * @param array $meta - Надо будет сделать поприличнее
     */
    private function __construct(public string $name, public string $email, public string $subject, public string $message) {}

    public static function fromRequest(Request $request): static
    {
        return new static(
            $request->get('name'),
            $request->get('email'),
            $request->get('subject'),
            $request->get('message')
        );
    }
}
