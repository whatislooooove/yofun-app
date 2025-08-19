<?php

namespace App\Observers;

use App\Models\Announcement;
use App\Repositories\CrawlerLogRepository;

class AnnouncementObserver
{
    /**
     * Handle the Announcement "created" event.
     */
    public function created(Announcement $announcement): void
    {
        app(CrawlerLogRepository::class)->create($announcement->toArray());
    }
}
