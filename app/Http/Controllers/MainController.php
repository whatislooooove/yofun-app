<?php

namespace App\Http\Controllers;

use App\Helpers\AnnouncementsHelper;
use Illuminate\View\View;

class MainController extends Controller
{
    public function index(): View {
        return view('web.index', [
            'sliderItems' => AnnouncementsHelper::getAnnouncementsForIndexSlider(3)
        ]);
    }

    public function about(): View {
        return view('web.sections.static.about');
    }
}
