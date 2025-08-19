<?php

namespace app\Repositories;

use App\Models\CrawlerLog;

class CrawlerLogRepository
{
    public function create(array $data): CrawlerLog
    {
        // TODO: добавить обработку ошибок, чтобы скрипт не завершался, а ошибка записывалась
        return CrawlerLog::create([
            'source_id' => $data['source_id'],
            'title' => $data['title'],
            'date_start' => $data['date_start'],
            'detail_url' => $data['detail_url'],
        ]);
    }
}
