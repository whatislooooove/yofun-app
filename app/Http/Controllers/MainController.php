<?php

namespace App\Http\Controllers;

use App\Helpers\AnnouncementsHelper;
use App\Models\Announcement;
use Illuminate\View\View;

class MainController extends Controller
{
    public function index(): View {
        return view('web.index', [
            'sliderItems' => AnnouncementsHelper::getAnnouncementsForIndexSlider(3),
            'tableItems' => Announcement::where('is_active', true)->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function about(): View {
        return view('web.sections.static.about');
    }
}
