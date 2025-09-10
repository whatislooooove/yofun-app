<?php

namespace App\Console\Commands\Sources;

use App\Helpers\ParserHelper;
use App\Helpers\SourceHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;

class AddSource extends Command
{
    protected $signature = 'source:add {url?}';
    protected $description = 'Add new events resource for parsing';

    public function handle(): void
    {
        $sourceUrl = $this->getSourceUrl();
        if (($sourceParser = ParserHelper::isSpecificSource($sourceUrl)) === true) {
            $sourceParser = $this->choice('Select parser for source', ParserHelper::getParsersList());
        }

        $result = SourceHelper::addNewSource($sourceUrl, $sourceParser);
        if ($result !== true) {
            $this->error($result);
        }
    }

    private function getSourceUrl() {
        $sourceUrl = $this->argument('url');

        if (!is_null($sourceUrl) && !$this->inputValidate($sourceUrl)) {
            $this->error(__('console.sources.incorrect_url'));
            exit();
        }

        return $this->inputHandle();
    }
    private function inputHandle(): string {
        while(true) {
            $url = $this->ask(__('console.sources.enter_url'));

            if ($this->inputValidate($url)) {
                return $url;
            }
        }
    }

    private function inputValidate($input): bool {
        $validator = Validator::make(['input' => $input], [
            'input' => ['min:3', 'max:255', 'url']
        ]);

        if ($validator->fails()){
            return false;
        }

        return true;
    }
}
