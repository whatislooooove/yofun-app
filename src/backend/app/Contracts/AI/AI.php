<?php

namespace App\Contracts\AI;

use app\DTO\AI\AIResponseRawDTO;

interface AI
{
    public function __construct();
    public function getName(): string;
    public function sendMessage(string $prompt): AIResponseRawDTO;
}
