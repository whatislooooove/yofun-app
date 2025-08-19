<?php

namespace app\Traits\Crawlers;

use Illuminate\Support\Facades\Log;

trait LoggableCrawler
{
    public function __destruct() {
        Log::channel('crawlers')->info('{target} scrapped ({count} items)',  [
            'target' => $this->url,
            'count' => count($this->savedAnnouncements)
        ]);
        Log::channel('crawlers')->debug($this->savedAnnouncements);
        Log::channel('crawlers')->warning("Block end\n\n");
    }
}
