<?php
namespace App\Logging;

use Monolog\Handler\RotatingFileHandler;

class LogFormat
{
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            if ($handler instanceof RotatingFileHandler) {
                $handler->setFilenameFormat('{date}-{filename}', 'Y-m-d');
            }
        }
    }
}
