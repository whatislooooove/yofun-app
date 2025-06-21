<?php

namespace App\Http\Controllers\API\V1;

use App\DTO\AnnouncementsDTO;
use App\Http\Controllers\Controller;
use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use OpenApi\Attributes as OA;

#[OA\Info(version: "1.0.0", title: "yofun API Doc")]
class MainController extends Controller
{
    const int ITEMS_PER_PAGE = 12;

    #[OA\Get(
        path: '/api/v1',
        summary: 'Get data for index page',
        tags: ['main'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'OK',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'sliderEvents',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/AnnouncementResource')
                        ),
                        new OA\Property(
                            property: 'upcomingEvents',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/AnnouncementResource')
                        ),
                        new OA\Property(
                            property: 'upcomingQuizzes',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/AnnouncementResource')
                        ),
                    ]
                )
            )
        ]
    )]
    public function index() {
        $eventsData = AnnouncementsDTO::fromCollection(Announcement::active()->get());

        return response()->json([
            'sliderEvents' => AnnouncementResource::collection($eventsData->sliderEvents),
            'upcomingEvents' => AnnouncementResource::collection($eventsData->upcomingEvents),
            'upcomingQuizzes' => AnnouncementResource::collection($eventsData->upcomingQuizzes),
        ]);
    }

    #[OA\Get(
        path: '/api/v1/quizzes',
        summary: 'Get all quizzes',
        tags: ['main'],
        parameters: [
            new OA\Parameter(
                name: 'page',
                description: 'Get items in target page',
                in: 'query',
                required: false,
                schema: new OA\Schema(type: 'number')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'OK',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/AnnouncementResource')
                        ),
                        new OA\Property(
                            property: 'meta',
                            type: 'array',
                            items: new OA\Items()
                        )
                    ]
                )
            )
        ]
    )]
    public function quizzes() {
        return AnnouncementResource::collection(Announcement::active()->quizzes()->paginate(self::ITEMS_PER_PAGE));
    }

    #[OA\Get(
        path: '/api/v1/events',
        summary: 'Get all events',
        tags: ['main'],
        parameters: [
            new OA\Parameter(
                name: 'page',
                description: 'Get items in target page',
                in: 'query',
                required: false,
                schema: new OA\Schema(type: 'number')
            )
        ],
        responses: [
            new OA\Response(
                response: 200,
                description: 'OK',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'data',
                            type: 'array',
                            items: new OA\Items(ref: '#/components/schemas/AnnouncementResource')
                        ),
                        new OA\Property(
                            property: 'meta',
                            type: 'array',
                            items: new OA\Items()
                        )
                    ]
                )
            )
        ]
    )]
    public function events() {
        return AnnouncementResource::collection(Announcement::active()->events()->paginate(self::ITEMS_PER_PAGE));
    }
}
