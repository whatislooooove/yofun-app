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

    public function handle()
    {
        // Перенес сюда, потому что при инициализации в конструкторе не проходит сборка:
        // @php artisan package:discover --ansi падает, потому что  конструктор используется для регистрации команды,
        // а бд во время сборки недоступно, так как сборка происходит на серверах github
        $this->sources = app(SourceRepository::class)->getActiveSources()->keyBy('url');
        $this->all = __('console.sources.all', [
            'count' => $this->sources->count()
        ]);

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
