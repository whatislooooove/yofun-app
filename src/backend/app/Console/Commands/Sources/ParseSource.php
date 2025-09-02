<?php

namespace App\Console\Commands\Sources;

use App\Helpers\SourceHelper;
use App\Repositories\SourceRepository;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Collection;

class ParseSource extends Command
{
    protected $signature = 'sources:parse {--all}';
    protected $description = 'Start parsing process for sources';

    private Collection $sources;
    private string $all;

    public function __construct(SourceRepository $repository)
    {
        $this->sources = $repository->getActiveSources()->keyBy('url');
        $this->all = __('console.sources.all', [
            'count' => $this->sources->count()
        ]);

        parent::__construct();
    }

    public function handle()
    {
        if ($this->isSourcesEmpty()) return;

        $choice = $this->getUserChoice();

        foreach ($this->sources as $key => $source) {
            if (($choice == $key) || ($choice == $this->all)) {
                $this->line(__('console.sources.handle', ['value' => $key]));
                SourceHelper::parseSource(source: $source, keyUrl: $key);
                $this->line(__('console.done'));
            }
        }

        $this->info(__('console.sources.parsed'));
    }

    private function isSourcesEmpty(): bool {
        if ($this->sources->isEmpty()){
            $this->error(__('console.sources.empty'));

            return true;
        }

        return false;
    }

    private function getUserChoice() {
        return $this->option('all')
            ? $this->all
            : $this->choice(__('console.sources.select'), array_merge($this->sources->pluck('url')->toArray(), [$this->all]));
    }
}
