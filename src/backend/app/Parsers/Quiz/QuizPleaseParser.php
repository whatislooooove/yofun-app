<?php

namespace App\Parsers\Quiz;

// Увеличиваю время выполнения только здесь, так как АPI Mistral AI может вернуть ответ не быстро
set_time_limit(600);

use AllowDynamicProperties;
use App\Contracts\AI\AI;
use app\Enums\AI\Prompts;
use App\Models\Announcement;
use App\Models\Source;
use App\Parsers\AbstractParser;
use app\Services\AI\MistralAI;
use App\Traits\LoggableCrawler;
use App\Utilities\AI\PromptPreparator;
use Illuminate\Support\Facades\Http;

#[AllowDynamicProperties] class QuizPleaseParser extends AbstractParser
{
    use LoggableCrawler;
    const string IMAGE_URL_PREFIX = 'https://file-storage.storage.yandexcloud.net/';
    const string DETAIL_PAGE = 'https://yo.quizplease.ru/game-page?id=';
    const string FRANCHISE_NAME = 'QuizPlease';
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
            preg_match_all('/<div\b[^>]*\bid="(\d+)"/', $this->htmlCode, $ids);
            foreach ($ids[1] as $id) {
                preg_match('#id="' . $id . '".*?<span class="price">([^<]+)</span>#s', $this->htmlCode, $price);
                $pricePrepared = filter_var($price[1], FILTER_SANITIZE_NUMBER_INT);

                preg_match('#id="' . $id . '".*?block-date.*?>\s*([^<]+)\s*</div>.*?<div class="techtext">([^<]+)</div>#s', $this->htmlCode, $dateTime);
                $dateTimePrepared = date('Y') . ' ' . $dateTime[1] . ' ' .  $dateTime[2];

                preg_match('#id="' . $id . '".*?h2-game-card.*?">([^<]+)</div>.*?h2-game.*?">([^<]+)#s', $this->htmlCode, $title);
                $titlePrepared = $title[1] . ' ' . ((strlen($title[2]) < 5) ? $title[2] : '');

                preg_match('#id="' . $id . '".*?techtext.*?">([^<]+)</div>#s', $this->htmlCode, $description);

                preg_match('#id="' . $id . '".*?schedule-block-info-bar">([^<]+)</div>.*?techtext.*?">([^<]+)<a#s', $this->htmlCode, $address);
                $addressPrepared = $address[2] . ' ' . $address[1];

                preg_match('#id="' . $id . '".*?url\(/files/([^<]+)\);#s', $this->htmlCode, $image);

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
                //--- ьлок выше норм
                $preparedToArray = str_replace(['```json', '```'], ['', ''], $mistralResponse->message);
                $preparedAiData = json_decode(is_array($preparedToArray) ? $preparedToArray[0] : $preparedToArray, true);
                //----

                $info = Announcement::create([
                    'source_id' => $this->source->id,
                    'date_start' => $preparedAiData['dateTime'],
                    'id_in_source' => $resultData['id_in_source'],
                    'title' => trim($resultData['title']),
                    'description' => $preparedAiData['description'],
                    'type' => 'quiz',
                    'address' => $resultData['address'],
                    'img' => self::IMAGE_URL_PREFIX . $resultData['image'],
                    'price' => $resultData['price'],
                    'detail_url' => self::DETAIL_PAGE . $resultData['id_in_source'],
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
}
