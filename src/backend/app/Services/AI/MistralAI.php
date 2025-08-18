<?php

declare(strict_types=1);

namespace app\Services\AI;

use App\Contracts\AI\AI;
use app\DTO\AI\AIResponseRawDTO;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\HttpFactory;
use SoftCreatR\MistralAI\MistralAI as MistralAIInternal;
use SoftCreatR\MistralAI\MistralAIURLBuilder;

/**
 * Example factory class for creating and using the MistralAI client.
 *
 * Provides methods to instantiate the MistralAI client and send requests to the MistralAI API endpoints.
 */
final class MistralAI implements AI
{
    const PAUSE_TIME = 3;
    const MODEL_NAME = 'codestral-latest';
    const AI_NAME = 'Mistral AI';
    /**
     * Prevents instantiation of this class.
     */
    public function __construct()
    {
        // This class should not be instantiated.
    }

    public function getName(): string
    {
        return self::AI_NAME;
    }

    public function sendMessage(string $prompt): AIResponseRawDTO
    {
        return AIResponseRawDTO::fromArray($this->simpleRequest($prompt));
    }

    /**
     * Creates an instance of the MistralAI client.
     *
     * Get API-key from env file
     *
     * @return MistralAIInternal The MistralAI client instance.
     */
    public static function create(): MistralAIInternal
    {
        $psr17Factory = new HttpFactory();
        $httpClient = new Client([
            'stream' => true,
        ]);

        return new MistralAIInternal(
            requestFactory: $psr17Factory,
            streamFactory: $psr17Factory,
            uriFactory: $psr17Factory,
            httpClient: $httpClient,
            apiKey: env('MISTRAL_API_KEY')
        );
    }

    public function simpleRequest(string $message): array {
        sleep(self::PAUSE_TIME);
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
            'response' => data_get($response, 'response.choices.0.message.content') ?? json_encode($response['response'])
        ];
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
    private static function request(string $method, array $parameters = [], ?callable $streamCallback = null): array
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
}
