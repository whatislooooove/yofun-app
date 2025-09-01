<?php

namespace app\Actions;

use App\Models\Announcement;

class GetStatisticsAction
{
    public function __invoke()
    {
        return [
            'todayEvents' => (new Announcement())->countToday(),
            'totalEvents' => (new Announcement())->countTotal(),
        ];
    }
}
