<?php

namespace App\Console\Commands\Announcements;

use App\Helpers\AnnouncementsHelper;
use Illuminate\Console\Command;

class ActualizeAnnouncements extends Command
{
    protected $signature = 'announcements:actualize';
    protected $description = 'Check date of announcements';

    public function handle()
    {
        $this->line(__('console.announcements.actualize'));
        AnnouncementsHelper::actualizeAnnouncementsStore();
        $this->info(__('console.done'));
    }
}
