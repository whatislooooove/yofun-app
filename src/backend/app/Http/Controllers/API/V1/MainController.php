<?php

namespace App\Http\Controllers\API\V1;

use App\DTO\AnnouncementsDTO;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;

class MainController extends Controller
{
    const int ITEMS_PER_PAGE = 12;
    public function index() {
        $eventsData = AnnouncementsDTO::fromCollection(Announcement::active()->get());

        return response()->json([
            'sliderEvents' => AnnouncementResource::collection($eventsData->sliderEvents),
            'upcomingEvents' => AnnouncementResource::collection($eventsData->upcomingEvents),
            'upcomingQuizzes' => AnnouncementResource::collection($eventsData->upcomingQuizzes),
        ]);
    }

    public function quizzes() {
        return AnnouncementResource::collection(Announcement::active()->quizzes()->paginate(self::ITEMS_PER_PAGE));
    }

    public function events() {
        return AnnouncementResource::collection(Announcement::active()->events()->paginate(self::ITEMS_PER_PAGE));
    }
}
