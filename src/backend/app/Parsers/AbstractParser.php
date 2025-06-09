<?php

namespace App\Parsers;

abstract class AbstractParser implements IParser
{
    protected string $url;

    abstract protected function getContent();
    abstract protected function parseContent();

    public function run(): void
    {
        $this->getContent();
        $this->parseContent();
    }
}
