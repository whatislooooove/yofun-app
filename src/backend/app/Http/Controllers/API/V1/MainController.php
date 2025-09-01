<?php

namespace App\Http\Controllers\API\V1;

use app\Actions\GetStatisticsAction;
use App\DTO\IndexDTO;
use App\DTO\FeedbackDTO;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Feedback;
use app\Repositories\AnnouncementRepository;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function index(AnnouncementRepository $announcements) {
        $allActive = $announcements->getActiveAnnouncements();
        $eventsData = IndexDTO::fromCollection($allActive);

        return response()->json([
            'sliderEvents' => AnnouncementResource::collection($eventsData->sliderEvents),
            'upcomingEvents' => AnnouncementResource::collection($eventsData->upcomingEvents),
            'upcomingQuizzes' => AnnouncementResource::collection($eventsData->upcomingQuizzes),
            'meta' => $eventsData->meta
        ]);
    }

    public function quizzes(AnnouncementRepository $announcements) {
        return AnnouncementResource::collection($announcements->getActiveQuizzesBuilder()
            ->paginate(config('app.items_per_page')));
    }

    public function events(AnnouncementRepository $announcements) {
        return AnnouncementResource::collection($announcements->getActiveEventsBuilder()
            ->paginate(config('app.items_per_page')));
    }

    public function static(GetStatisticsAction $action) {
        return response()->json($action());
    }

    public function feedback(Request $request) {
        // todo: сделать форм реквест
        $request->validate([
            'name' => ['required', 'max:255', 'min:2'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'max:255'],
            'message' => ['required', 'max:16384'],
        ]);

        $feedbackData = FeedbackDTO::fromRequest($request);

        Feedback::create([
            'name' => $feedbackData->name,
            'email' => $feedbackData->email,
            'subject' => $feedbackData->subject,
            'message' => $feedbackData->message,
        ]);

        return response()->json([
            'message' => 'Ок'
        ]);
    }
}
