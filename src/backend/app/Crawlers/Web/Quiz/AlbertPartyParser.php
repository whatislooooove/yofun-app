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

#[AllowDynamicProperties] final class AlbertPartyParser extends WebParser
{
    use LoggableCrawler;

    const string DOMAIN = 'https://yo.albertparty.ru';
    const string DEFAULT_IMAGE = 'https://sun9-23.userapi.com/s/v1/ig2/jbJkPPMGtNfc0k0w9e30sdQV6QdUImxss8-gznsuoi7mQ_cnzDpjIVj7keilxbNwKQBTQuo4-r3bq2cLJI6X1n_Q.jpg?quality=95&crop=0,0,1080,1080&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,1080x1080&ava=1&cs=300x300';
    const string FRANCHISE_NAME = 'AlbertParty (WowQuiz)';

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
            preg_match_all('/<div\b[^>]*\bdata-game_id="(\d+)"/', $this->htmlCode, $ids);
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
        preg_match('#data-game_id="' . $externalId . '".*?price">(\d+).*?</div>#s', $this->htmlCode, $price);
        $pricePrepared = filter_var($price[1], FILTER_SANITIZE_NUMBER_INT);

        preg_match('#data-game_id="' . $externalId . '".*?<span.*?">([^<]+).*?">([^<]+).*?">([^<]+)</span>#s', $this->htmlCode, $dateTime);
        $dateTimePrepared = date('Y') . ' ' . $dateTime[1] . ' ' .  $dateTime[2] . ' ' .  $dateTime[3];

        preg_match('#data-game_id="' . $externalId . '".*?data-game_name="(.*?)"#s', $this->htmlCode, $title);
        $titlePrepared = $title[1];

        preg_match('#data-game_id="' . $externalId . '".*?game-item-labels.*?item_classic">(.*?)</div>#s', $this->htmlCode, $description);

        preg_match('#data-game_id="' . $externalId . '".*?data-place_address="(.*?)"#s', $this->htmlCode, $address);
        $addressPrepared = $address[1];

        preg_match('#data-game_id="' . $externalId . '".*?data-game_img="(.*?)"#s', $this->htmlCode, $image);

        return [
            'source_id' => $this->source->id,
            'id_in_source' => $externalId,
            'detail_url' => self::DOMAIN . '/game/' . $externalId,
            'title' => trim($titlePrepared),
            'description' => data_get($description, '1', ''),
            'date_start' => $dateTimePrepared,
            'price' => $pricePrepared,
            'address' => $addressPrepared,
            'image' => is_null(urldecode($image[1])) ? self::DEFAULT_IMAGE : self::DOMAIN . urldecode($image[1]),
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
