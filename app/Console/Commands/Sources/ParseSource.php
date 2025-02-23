<?php

namespace App\Console\Commands\Sources;

use App\Helpers\SourceHelper;
use App\Models\Source;
use Illuminate\Console\Command;

class ParseSource extends Command
{
    const PARSE_ALL_MESSAGE = 'Start parsing all resources';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sources:parse {--all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start parsing process for sources';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sources = Source::where('is_active', true)->orderBy('created_at', 'desc')->get()->keyBy('url');
        if ($sources->isEmpty()){
            $this->error('Active sources is doesn\'t exist');
            return;
        }

        $all = 'All (' . $sources->count() . ')';
        $choice = $this->option('all') ? $all : $this->choice('Select source for parse', array_merge($sources->pluck('url')->toArray(), [$all]));

        foreach ($sources as $key => $source) {
            if (($choice == $key) || ($choice == $all)) {
                SourceHelper::parseSource(source: $source, keyUrl: $key);
            }
        }

        $this->info('Done');
    }
}
