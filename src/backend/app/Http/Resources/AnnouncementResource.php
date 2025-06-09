<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

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
            'date' => Carbon::parse($this->date_start)->format('Y-m-d'),
            'time' => Carbon::parse($this->date_start)->format('H:i'),
            'location' => $this->address,
            'price' => $this->price,
            'category' => $this->type,
            'image' => $this->img,
        ];
    }
}
