<?php

namespace app\Crawlers\Web\Quiz;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Crawlers\Web\WebParser;
use App\Models\Source;
use app\Repositories\AnnouncementRepository;
use app\Traits\Crawlers\LoggableCrawler;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;

#[AllowDynamicProperties] final class ObanaQuizParser extends WebParser
{
    use LoggableCrawler;
    const string DEFAULT_IMAGE = 'http://127.0.0.1:80/storage/img/obanaquiz.jpg';
    const string IMAGE_PREFIX = 'https://obana.club/_next/image';
    const string API_URL = 'https://obana.club/api/cities/5/games';

    const string FRANCHISE_NAME = 'ObanaQuiz';

    protected string $url;
    protected Source $source;
    protected array $preparedData;

    public function __construct(string $url)
    {
        $this->source = Source::where('url', $url)->first();
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
            'detail_url' => $this->url . '?game=' . $rawData['id'],
            'title' => $rawData['title'],
            'description' => $rawData['description'],
            'date_start' => $rawData['date'],
            'price' => $rawData['price'],
            'address' => $rawData['location']['address'], //TODO: отличаются у разных апи. Можно сделать в dot-нотации в константах у каждого класса
            'image' => $rawData['imageFileId'] ? self::IMAGE_PREFIX .'?url=%2Fapi%2Ffiles%2F' . $rawData['imageFileId'] . '&w=640&q=75%201x': self::DEFAULT_IMAGE,
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
