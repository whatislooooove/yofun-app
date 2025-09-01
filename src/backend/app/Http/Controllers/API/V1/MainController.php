<?php

namespace App\Http\Controllers\API\V1;

use App\DTO\IndexDTO;
use App\DTO\FeedbackDTO;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use App\Models\Feedback;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

class MainController extends Controller
{
    public function index() {
        $allActive = Announcement::active()->get();
        $eventsData = IndexDTO::fromCollection($allActive);

        return response()->json([
            'sliderEvents' => AnnouncementResource::collection($eventsData->sliderEvents),
            'upcomingEvents' => AnnouncementResource::collection($eventsData->upcomingEvents),
            'upcomingQuizzes' => AnnouncementResource::collection($eventsData->upcomingQuizzes),
            'meta' => $eventsData->meta
        ]);
    }

    public function quizzes() {
        return AnnouncementResource::collection(Announcement::active()->quizzes()->paginate(config('app.items_per_page')));
    }

    public function events() {
        return AnnouncementResource::collection(Announcement::active()->events()->paginate(config('app.items_per_page')));
    }

    public function static(Announcement $announcement) {
        return response()->json([
            'todayEvents' => $announcement->countToday(),
            'totalEvents' => $announcement->countTotal(),
        ]);
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
