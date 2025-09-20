<?php

namespace App\Http\Controllers\API\V1;

use App\Actions\GetStatisticsAction;
use App\DTO\IndexDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\FeedbackRequest;
use App\Http\Resources\AnnouncementResource;
use App\Repositories\AnnouncementRepository;
use App\Repositories\FeedbackRepository;

class MainController extends Controller
{
    public function index(AnnouncementRepository $announcements) {
        $dto = IndexDTO::fromCollection($announcements->getActiveAnnouncements());

        return response()->json($dto->toArray());
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

    public function feedback(FeedbackRequest $request, FeedbackRepository $repository) {
        $repository->create($request->validated());

        return response()->json([
            'message' => 'Ok'
        ], 201);
    }
}
