<?php

namespace App\Console\Commands\Announcements;

use App\Helpers\AnnouncementsHelper;
use Illuminate\Console\Command;

class ActualizeAnnouncements extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'announcements:actualize';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check date of announcements';

    /**
     * Execute the console command.
     * TODO: поставить в планировщик на ежедневное выполнение
     */
    public function handle()
    {
        $this->line('Start actualizing...');
        AnnouncementsHelper::actualizeAnnouncementsStore();
        $this->info('Done');
    }
}
