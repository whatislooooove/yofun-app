<?php

namespace App\Http\Controllers\Swagger\API\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenApi\Attributes as OA;

#[OA\Info(
    version: "1.0.0",
    description: "Description about simple API methods in yofun project",
    title: "yofun API Doc",
)]
class MainController extends Controller
{
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
        // Stub
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
        // Stub
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
        // Stub
    }

    #[OA\Get(
        path: '/api/v1/static',
        summary: 'Get static data',
        tags: ['main'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'OK',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'todayCount', type: 'integer', example: 4),
                        new OA\Property(property: 'totalCount', type: 'integer', example: 23),
                    ]
                )
            )
        ]
    )]
    public function static() {
        // Stub
    }

    #[OA\Post(
        path: '/api/v1/feedback',
        summary: 'Send feedback',
        requestBody: new OA\RequestBody(
            description: 'Feedback data',
            required: true,
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(
                        property: 'name',
                        description: 'User name (min 2 characters)',
                        type: 'string',
                        example: 'John Doe'
                    ),
                    new OA\Property(
                        property: 'email',
                        description: 'Valid email address',
                        type: 'string',
                        format: 'email',
                        example: 'user@example.com'
                    ),
                    new OA\Property(
                        property: 'subject',
                        description: 'Message subject',
                        type: 'string',
                        example: 'Frontend features'
                    ),
                    new OA\Property(
                        property: 'message',
                        description: 'Feedback text content',
                        type: 'string',
                        example: 'This is my feedback message'
                    ),
                ],
                type: 'object'
            )
        ),
        tags: ['main'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'OK',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'OK'),
                    ]
                )
            ),
            new OA\Response(
                response: 422,
                description: 'Invalid data',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: 'message', type: 'string', example: 'Name must have at least 4 letters'),
                    ]
                )
            ),
            new OA\Response(
                response: 500,
                description: 'Internal error'
            )
        ],
    )]
    public function feedback(Request $request) {
        // Stub
    }
}
