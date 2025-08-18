<?php

namespace app\DTO\AI;

class AIResponseRawDTO
{
    private function __construct(public bool $isSuccess, public string $message) {}

    public static function fromArray(array $array): AIResponseRawDTO {
        $isSuccess = data_get($array, 'isSuccess', false);
        $message = data_get($array, 'response');

        return new AIResponseRawDTO($isSuccess, $message);
    }
}
