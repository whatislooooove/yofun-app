<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class MainController extends Controller
{
    public function index(): View {
        // Пример инициализации и запуска парсера
        $parserName = 'App\Parsers\VKParser';
        $parser = new $parserName('https://vk.com/collision_coffee_food12');
        $parser->run();

        return view('web.sections.static.home');
    }
}
