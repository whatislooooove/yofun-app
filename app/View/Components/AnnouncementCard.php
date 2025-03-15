<?php

namespace App\View\Components;

use App\Models\Announcement;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class AnnouncementCard extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public Announcement $announcement)
    {
        //
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.announcement-card');
    }
}
