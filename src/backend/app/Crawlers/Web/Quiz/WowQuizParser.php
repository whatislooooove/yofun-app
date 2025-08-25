<?php

namespace app\Crawlers\Web\Quiz;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Crawlers\AbstractParser;
use app\Crawlers\Web\WebParser;
use App\Models\Source;
use app\Repositories\AnnouncementRepository;
use app\Traits\Crawlers\LoggableCrawler;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

#[AllowDynamicProperties] class WowQuizParser extends WebParser
{
    use LoggableCrawler;
    const string DEFAULT_IMAGE = 'http://127.0.0.1:80/storage/img/wowquiz.jpg';
    const string API_URL = 'https://api.etowow.ru/games/all';
    const string DETAIL_PAGE = 'https://yo.wowquiz.ru/schedule';

    const string FRANCHISE_NAME = 'WowQuiz';

    protected string $url;
    protected Source $source;
    protected array $preparedData;

    public function __construct(string $url)
    {
        $this->url = $url;
        $this->source = Source::where('url', $url)->first();
    }
    protected function getContent(): void
    {
        $params = [
            'upcoming' => 1,
            'page' => 1,
            'domain' => $this->url,
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
        $games = data_get($this->preparedData, 'data.games', []);
        foreach ($games as $game) {
            $resultData = $this->getAnnouncementDetail($game);
            if (!is_null(app(AnnouncementRepository::class)->getByExternalId($game['id']))) {
                continue;
            }

            $preparedAiData = $this->getAIHandledData($resultData);

            $current = app(AnnouncementRepository::class)->create(array_merge($resultData, $preparedAiData));
            $this->setSavedAnnouncements($current);
        }
    }

    protected function getAnnouncementDetail(array $rawData): array
    {
        return [
            'source_id' => $this->source->id,
            'id_in_source' => $rawData['id'],
            'detail_url' => self::DETAIL_PAGE,
            'title' => $rawData['title'],
            'description' => $rawData['description'],
            'date_start' => $rawData['date'],
            'price' => $rawData['price'],
            'address' => $rawData['bar']['address'],
            'image' => $rawData['image_url'] ?? self::DEFAULT_IMAGE,
            'type' => 'quiz',
            'extra' => [
                'franchise' => self::FRANCHISE_NAME
            ]
        ];
    }

    protected function getAnnouncementDetailById(int $externalId)
    {
        // TODO: Implement getAnnouncementDetailById() method.
    }
}
