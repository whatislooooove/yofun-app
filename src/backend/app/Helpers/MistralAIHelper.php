<?php

declare(strict_types=1);

namespace App\Helpers;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\HttpFactory;
use SoftCreatR\MistralAI\MistralAI;
use SoftCreatR\MistralAI\MistralAIURLBuilder;

/**
 * Example factory class for creating and using the MistralAI client.
 *
 * Provides methods to instantiate the MistralAI client and send requests to the MistralAI API endpoints.
 */
final class MistralAIHelper
{
    const PAUSE_TIME = 3;
    const MODEL_NAME = 'codestral-latest';
    /**
     * Prevents instantiation of this class.
     */
    private function __construct()
    {
        // This class should not be instantiated.
    }

    /**
     * Creates an instance of the MistralAI client.
     *
     * Get API-key from env file
     *
     * @return MistralAI The MistralAI client instance.
     */
    public static function create(): MistralAI
    {
        $psr17Factory = new HttpFactory();
        $httpClient = new Client([
            'stream' => true,
        ]);

        return new MistralAI(
            requestFactory: $psr17Factory,
            streamFactory: $psr17Factory,
            uriFactory: $psr17Factory,
            httpClient: $httpClient,
            apiKey: env('MISTRAL_API_KEY')
        );
    }

    /**
     * Sends a request to the specified MistralAI API endpoint.
     *
     * @param string $method The name of the API method to call.
     * @param array $parameters An associative array of parameters (URL parameters or request options).
     * @param callable|null $streamCallback Optional callback function for streaming responses.
     *
     * @return array
     */
    public static function request(string $method, array $parameters = [], ?callable $streamCallback = null): array
    {
        $mistralAI = self::create();
        $isSuccess = false;
        $response = [];

        try {
            $endpoint = MistralAIURLBuilder::getEndpoint($method);
            $path = $endpoint['path'];

            // Determine if the path contains placeholders
            $hasPlaceholders = \preg_match('/\{(\w+)}/', $path) === 1;

            if ($hasPlaceholders) {
                $urlParameters = $parameters;
                $bodyOptions = [];
            } else {
                $urlParameters = [];
                $bodyOptions = $parameters;
            }

            if ($streamCallback !== null) {
                $mistralAI->{$method}($urlParameters, $bodyOptions, $streamCallback);
            } else {
                $response = $mistralAI->{$method}($urlParameters, $bodyOptions);

                $result = \json_decode(
                    $response->getBody()->getContents(),
                    true,
                    512,
                    \JSON_THROW_ON_ERROR | \JSON_UNESCAPED_UNICODE
                );

                $isSuccess = true;
                $response = $result;
            }
        } catch (Exception $e) {
            $response = [$e->getMessage()];
        }

        return [
            'isSuccess' => $isSuccess,
            'response' => $response
        ];
    }

    public static function simpleRequest(string $message): array {
        sleep(self::PAUSE_TIME); // Чтобы не нарваться на лимит частоты запросов
        $response = self::request('createChatCompletion', [
            'model' => self::MODEL_NAME,
            'messages' => [
                [
                    'role' => 'user',
                    'content' => $message,
                ],
            ],
            'temperature' => 0.7,
            'top_p' => 1,
        ]);

        return [
            'isSuccess' => $response['isSuccess'],
            'response' => data_get($response, 'response.choices.0.message.content') ?? $response['response']
        ];
    }

}
