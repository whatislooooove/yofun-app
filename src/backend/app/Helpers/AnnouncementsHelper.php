<?php

namespace App\Helpers;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Collection;

final class AnnouncementsHelper
{
    public static function actualizeAnnouncementsStore(): void {
        foreach (Announcement::active()->get() as $announcement) {
            if (strtotime($announcement->date_start) < time()) {
                $announcement->is_active = false;
                $announcement->save();
            }
        }
    }
}
