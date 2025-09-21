<?php

namespace Tests\Feature\Console\Sources;

use App\Helpers\ParserHelper;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddSourceTest extends TestCase
{
    use RefreshDatabase;

    const string VK_SOURCE = 'https://vk.com/group/123';
    const string HTML_SOURCE = 'https://another-source.ru';

    public function test_vk_source(): void
    {
        $this->artisan('source:add ' . self::VK_SOURCE)->assertSuccessful();
        $this->assertDatabaseCount('sources', 1);
    }

    public function test_vk_source_from_ask(): void
    {
        $this->artisan('source:add')
            ->expectsQuestion(__('console.sources.enter_url'), self::VK_SOURCE)
            ->assertSuccessful();
        $this->assertDatabaseCount('sources', 1);
    }

    public function test_html_source(): void
    {
        $this->artisan('source:add ' . self::HTML_SOURCE)
            ->expectsChoice(__('console.sources.parser_choice'), '0', ParserHelper::getParsersList());
        $this->assertDatabaseCount('sources', 1);
    }

    public function test_html_source_from_ask(): void
    {
        $this->artisan('source:add')
            ->expectsQuestion(__('console.sources.enter_url'), self::HTML_SOURCE)
            ->expectsChoice(__('console.sources.parser_choice'), '0', ParserHelper::getParsersList());
        $this->assertDatabaseCount('sources', 1);
    }
}
