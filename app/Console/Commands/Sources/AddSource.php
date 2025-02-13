<?php

namespace App\Console\Commands\Sources;

use App\Helpers\SourceHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;

class AddSource extends Command
{
    const INPUT_MESSAGE = 'Enter correct url';
    const INCORRECT_URL_MESSAGE = 'Incorrect url';
    const SUCCESSFULL_MESSAGE = 'Source added';
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'source:add {url?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add new events resource for parsing';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $sourceUrl = $this->argument('url');

        if (!is_null($sourceUrl)) {
            if (!$this->inputValidate($sourceUrl)) {
                $this->error(self::INCORRECT_URL_MESSAGE);

                return;
            }
        } else {
            $sourceUrl = $this->inputHandle();
        }

        $result = SourceHelper::addNewSource($sourceUrl);
        if ($result !== true) {
            $this->error($result);

            return;
        }

        $this->info(self::SUCCESSFULL_MESSAGE);
    }

    private function inputHandle(): string {
        while(true) {
            $url = $this->ask(self::INPUT_MESSAGE);

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
