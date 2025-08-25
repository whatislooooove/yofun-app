<?php

namespace App\Crawlers\Web;

use App\Crawlers\AbstractParser;

abstract class WebParser extends AbstractParser
{
    //TODO: реализацию этих методов надо будет вынести сюда
    protected abstract function getAnnouncementDetailById(int $externalId);
}
