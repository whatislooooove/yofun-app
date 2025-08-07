<?php

namespace app\Console\Commands\Sources;

use App\Enums\DefaultSources;
use App\Models\Source;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class InitSources extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sources:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add default sources';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        if (Source::count() > 0) {
            $this->error('Sources table must be empty');
            return;
        }

        foreach (DefaultSources::cases() as $source) {
            $this->line("Start $source->name handle");

            Artisan::call('source:add', [
                'url' => $source->value
            ], $this->getOutput());

            $this->info("$source->name ($source->value) added");
        }
    }
}
