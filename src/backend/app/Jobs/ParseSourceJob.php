<?php

namespace App\Jobs;

use App\Helpers\SourceHelper;
use App\Models\Source;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ParseSourceJob implements ShouldQueue
{
    use Queueable;

    public function __construct(private Source $source, private string $keyUrl)
    {
        // Stub
    }

    /**
     * Execute the job.
     * @throws \Exception
     */
    public function handle(): void
    {
        try {
            Log::info("Начинаю парсить: {$this->keyUrl}");

            SourceHelper::parseSource(
                source: $this->source,
                keyUrl: $this->keyUrl
            );

            Log::info("Спаршено: {$this->keyUrl}");
        } catch (\Exception $e) {
            Log::error("Не удалось спарсить {$this->keyUrl}: " . $e->getMessage());
        }
    }
}
