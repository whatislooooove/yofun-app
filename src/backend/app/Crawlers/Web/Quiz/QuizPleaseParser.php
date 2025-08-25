<?php

namespace app\Crawlers\Web\Quiz;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Crawlers\Web\WebParser;
use App\Models\Source;
use App\Repositories\AnnouncementRepository;
use app\Traits\Crawlers\LoggableCrawler;
use Illuminate\Support\Facades\Http;

#[AllowDynamicProperties] class QuizPleaseParser extends WebParser
{
    use LoggableCrawler;

    const string IMAGE_URL_PREFIX = 'https://file-storage.storage.yandexcloud.net/';
    const string DETAIL_PAGE = 'https://yo.quizplease.ru/game-page?id=';
    const string FRANCHISE_NAME = 'QuizPlease';

    protected string $url;
    protected Source $source;
    private string $htmlCode;

    public function __construct(string $url)
    {
        $this->url = $url;
        $this->source = Source::where('url', $url)->first();
    }

    protected function getContent(): void
    {
        $response = Http::get($this->url);
        $body = $response->body();
        if ($response->getStatusCode() != 200) {
            echo 'Cant get data from ' . $this->url . '. Error: ' . $body;
            return;
        }

        $this->htmlCode = $body;
    }

    protected function parseContent(): void
    {
        if (isset($this->htmlCode)) {
            preg_match_all('/<div\b[^>]*\bid="(\d+)"/', $this->htmlCode, $ids);
            foreach ($ids[1] as $id) {
                $resultData = $this->getAnnouncementDetailById($id);
                if (!is_null(app(AnnouncementRepository::class)->getByExternalId($id))) {
                    continue;
                }

                $preparedAiData = $this->getAIHandledData($resultData);

                $current = app(AnnouncementRepository::class)->create(array_merge($resultData, $preparedAiData));
                $this->setSavedAnnouncements($current);
            }
        }
    }

    protected function getAnnouncementDetailById(int $externalId): array
    {
        preg_match('#id="' . $externalId . '".*?<span class="price">([^<]+)</span>#s', $this->htmlCode, $price);
        $pricePrepared = filter_var($price[1], FILTER_SANITIZE_NUMBER_INT);

        preg_match('#id="' . $externalId . '".*?block-date.*?>\s*([^<]+)\s*</div>.*?<div class="techtext">([^<]+)</div>#s', $this->htmlCode, $dateTime);
        $dateTimePrepared = date('Y') . ' ' . $dateTime[1] . ' ' . $dateTime[2];

        preg_match('#id="' . $externalId . '".*?h2-game-card.*?">([^<]+)</div>.*?h2-game.*?">([^<]+)#s', $this->htmlCode, $title);
        $titlePrepared = $title[1] . ' ' . ((strlen($title[2]) < 5) ? $title[2] : '');

        preg_match('#id="' . $externalId . '".*?techtext.*?">([^<]+)</div>#s', $this->htmlCode, $description);

        preg_match('#id="' . $externalId . '".*?schedule-block-info-bar">([^<]+)</div>.*?techtext.*?">([^<]+)<a#s', $this->htmlCode, $address);
        $addressPrepared = $address[2] . ' ' . $address[1];

        preg_match('#id="' . $externalId . '".*?url\(/files/([^<]+)\);#s', $this->htmlCode, $image);

        return [
            'source_id' => $this->source->id,
            'id_in_source' => $externalId,
            'detail_url' => self::DETAIL_PAGE . $externalId,
            'title' => trim($titlePrepared),
            'description' => $description[1],
            'date_start' => $dateTimePrepared,
            'price' => $pricePrepared,
            'address' => $addressPrepared,
            'image' => self::IMAGE_URL_PREFIX . urldecode($image[1]),
            'type' => 'quiz',
            'extra' => [
                'franchise' => self::FRANCHISE_NAME
            ]
        ];
    }

    protected function getAnnouncementDetail(array $rawData)
    {
        // TODO: Implement getAnnouncementDetail() method.
    }
}
