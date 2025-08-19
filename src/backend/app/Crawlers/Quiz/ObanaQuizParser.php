<?php

namespace App\Crawlers\Quiz;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Contracts\AI\AI;
use App\Crawlers\AbstractParser;
use App\Models\Announcement;
use App\Models\Source;
use app\Traits\Crawlers\LoggableCrawler;
use App\Utilities\AI\PromptPreparator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

#[AllowDynamicProperties] class ObanaQuizParser extends AbstractParser
{
    use LoggableCrawler;
    const string DEFAULT_IMAGE = 'http://127.0.0.1:80/storage/img/obanaquiz.jpg';
    const string IMAGE_PREFIX = 'https://obana.club/_next/image';
    const string API_URL = 'https://obana.club/api/cities/5/games';

    const string FRANCHISE_NAME = 'ObanaQuiz';

    protected string $url;
    protected array $preparedData;

    public function __construct(string $url)
    {
        $this->url = $url;
    }
    protected function getContent(): void
    {
        $params = [
            'page' => 1,
            'withPast' => 'false',
        ];
        $targetUrl = URL::to(self::API_URL . '?' . http_build_query($params));
        $response = Http::get($targetUrl);
        $body = $response->body();
        if ($response->getStatusCode() != 200) {
            echo 'Cant get data from ' . $targetUrl . '. Error: ' . $body;
            return;
        }

        $this->preparedData = json_decode($body, true);
    }

    protected function parseContent(): void
    {
        $games = data_get($this->preparedData, 'content.items', []);
        $sourceId = Source::where('parser', $this::class)->select('id')->first()->id;

        foreach ($games as $game) {
            $targetData = [
                'id_in_source' => $game['id'],
                'title' => $game['title'],
                'description' => $game['description'],
                'price' => $game['price'],
                'dateTime' => $game['date'],
                'address' => $game['location']['address'],
                'image' => $game['imageFileId'] ? self::IMAGE_PREFIX .'?url=%2Fapi%2Ffiles%2F' . $game['imageFileId'] . '&w=640&q=75%201x': self::DEFAULT_IMAGE,
            ];

            if (Announcement::where('id_in_source', $targetData['id_in_source'])->exists()) {
                continue;
            }

            //----
            $prompt = app(PromptPreparator::class)->findAnnouncementOther($targetData);
            $mistralResponse = app(AI::class)->sendMessage($prompt);
            //--- блок выше норм
            $preparedToArray = str_replace(['```json', '```'], ['', ''], $mistralResponse->message);
            $preparedAiData = json_decode(is_array($preparedToArray) ? $preparedToArray[0] : $preparedToArray, true);
            //----

            $info = Announcement::create([
                'source_id' => $sourceId,
                'date_start' => $preparedAiData['dateTime'],
                'id_in_source' => $targetData['id_in_source'],
                'title' => $targetData['title'],
                'description' => $preparedAiData['description'],
                'type' => 'quiz',
                'address' => $targetData['address'],
                'img' => $targetData['image'],
                'price' => $targetData['price'],
                'detail_url' => $this->url . '?game=' . $targetData['id_in_source'],
                'latitude' => 0,
                'longitude' => 0,
                'extra' => [
                    'franchise' => self::FRANCHISE_NAME
                ]
            ]);

            $this->setSavedAnnouncements($info);
        }
    }
}
