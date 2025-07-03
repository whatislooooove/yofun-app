<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use OpenApi\Attributes as OA;

#[OA\Schema(
    schema: 'AnnouncementResource',
    properties: [
        new OA\Property(property: 'id', type: 'number', example: '1'),
        new OA\Property(property: 'title', type: 'string', example: 'Трибьютный концерт'),
        new OA\Property(property: 'description', type: 'string', example: 'Описание трибьютного концерта'),
        new OA\Property(property: 'detail', type: 'string', example: 'example.com'),
        new OA\Property(property: 'date', type: 'string', example: '2025-06-21'),
        new OA\Property(property: 'time', type: 'string', example: '20:00'),
        new OA\Property(property: 'location', type: 'string', example: 'паб Бульдог'),
        new OA\Property(property: 'price', type: 'number', example: '1500'),
        new OA\Property(property: 'category', type: 'string', example: 'концерты'),
        new OA\Property(property: 'image', type: 'string', example: 'example.com/image.png'),
    ],
    type: 'object'
)]
class AnnouncementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'detail' => $this->detail_url,
            'date' => Carbon::parse($this->date_start)->format('Y-m-d'),
            'time' => Carbon::parse($this->date_start)->format('H:i'),
            'location' => $this->address,
            'price' => $this->price,
            'category' => $this->type,
            'image' => $this->img,
            'extra' => $this->when($this->resource->isQuiz(), [
                'franchise' => data_get($this->extra, 'franchise')
            ]),
        ];
    }
}
