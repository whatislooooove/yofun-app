<?php

namespace tests\Feature\Console\Announcements;

use App\Models\Announcement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ActualizeAnnouncementsTest extends TestCase
{
    use RefreshDatabase;

    public function test_status_code(): void
    {
        $this->artisan('announcements:actualize')->assertSuccessful();
    }
}
