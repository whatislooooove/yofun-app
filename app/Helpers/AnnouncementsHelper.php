<?php

namespace App\Helpers;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Collection;

class AnnouncementsHelper
{
    public static function getAnnouncementsForIndexSlider(int $limit): Collection {
        return Announcement::orderBy('created_at', 'desc')->limit($limit)->get();
    }
}
