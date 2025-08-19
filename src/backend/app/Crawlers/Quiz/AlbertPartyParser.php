<?php

namespace app\Crawlers\Quiz;

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

#[AllowDynamicProperties] class AlbertPartyParser extends AbstractParser
{
    use LoggableCrawler;
    const string DOMAIN = 'https://yo.albertparty.ru';
    const string FRANCHISE_NAME = 'AlbertParty (WowQuiz)';
    protected string $url;
    private Source $source;
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
                preg_match('#data-game_id="' . $id . '".*?price">(\d+).*?</div>#s', $this->htmlCode, $price);
                $pricePrepared = filter_var($price[1], FILTER_SANITIZE_NUMBER_INT);

                preg_match('#data-game_id="' . $id . '".*?<span.*?">([^<]+).*?">([^<]+).*?">([^<]+)</span>#s', $this->htmlCode, $dateTime);
                $dateTimePrepared = date('Y') . ' ' . $dateTime[1] . ' ' .  $dateTime[2] . ' ' .  $dateTime[3];

                preg_match('#data-game_id="' . $id . '".*?data-game_name="(.*?)"#s', $this->htmlCode, $title);
                $titlePrepared = $title[1];

                preg_match('#data-game_id="' . $id . '".*?game-item-labels.*?item_classic">(.*?)</div>#s', $this->htmlCode, $description);

                preg_match('#data-game_id="' . $id . '".*?data-place_address="(.*?)"#s', $this->htmlCode, $address);
                $addressPrepared = $address[1];

                preg_match('#data-game_id="' . $id . '".*?data-place_latitude="(.*?)".*?data-place_longitude="(.*?)"#s', $this->htmlCode, $coords);
                $coordsPrepared = [
                    'latitude' => $coords[1],
                    'longitude' => $coords[2],
                ];

                preg_match('#data-game_id="' . $id . '".*?data-game_img="(.*?)"#s', $this->htmlCode, $image);

                $resultData = [
                    'id_in_source' => $id,
                    'title' => $titlePrepared,
                    'description' => $description[1],
                    'price' => $pricePrepared,
                    'dateTime' => $dateTimePrepared,
                    'address' => $addressPrepared,
                    'image' => urldecode($image[1]),
                ];

                if (Announcement::where('id_in_source', $resultData['id_in_source'])->exists()) {
                    continue;
                }

                //----
                $prompt = app(PromptPreparator::class)->findAnnouncementOther($resultData);
                $mistralResponse = app(AI::class)->sendMessage($prompt);
                //--- блок выше норм
                $preparedToArray = str_replace(['```json', '```'], ['', ''], $mistralResponse->message);
                $preparedAiData = json_decode(is_array($preparedToArray) ? $preparedToArray[0] : $preparedToArray, true);
                //----

                $info = Announcement::create([
                    'source_id' => $this->source->id,
                    'date_start' => $preparedAiData['dateTime'],
                    'id_in_source' => $resultData['id_in_source'],
                    'title' => $resultData['title'],
                    'description' => $preparedAiData['description'],
                    'type' => 'quiz',
                    'address' => $resultData['address'],
                    'img' => self::DOMAIN . $resultData['image'],
                    'price' => $resultData['price'],
                    'detail_url' => self::DOMAIN . '/game/' . $resultData['id_in_source'],
                    'latitude' => $coordsPrepared['latitude'],
                    'longitude' => $coordsPrepared['longitude'],
                    'extra' => [
                        'franchise' => self::FRANCHISE_NAME
                    ]
                ]);

                $this->setSavedAnnouncements($info);
            }
        }
    }
}
