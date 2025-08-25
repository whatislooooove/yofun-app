<?php

namespace app\Repositories;

use App\Models\Announcement;

class AnnouncementRepository
{
    public function getByExternalId(int $id): ?Announcement
    {
        return Announcement::where('id_in_source', $id)->first();
    }

    public function create(array $data): Announcement
    {
        return Announcement::create([
            'source_id' => $data['source_id'],
            'date_start' => $data['dateTime'],
            'id_in_source' => $data['id_in_source'],
            'title' => $data['title'],
            'description' => $data['description'],
            'address' => $data['address'],
            'img' => $data['image'],
            'price' => $data['price'],
            'detail_url' => $data['detail_url'],
            'latitude' => 0,
            'longitude' => 0,
            'extra' => $data['extra'],
            'type' => $data['type']
        ]);
    }
}
