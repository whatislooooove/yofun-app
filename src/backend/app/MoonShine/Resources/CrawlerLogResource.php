<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\CrawlerLog;

use MoonShine\Laravel\Enums\Action;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Support\ListOf;
use MoonShine\UI\Components\Layout\Box;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\ID;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\UI\Fields\Text;
use MoonShine\UI\Fields\Url;

/**
 * @extends ModelResource<CrawlerLog>
 */
class CrawlerLogResource extends ModelResource
{
    protected string $model = CrawlerLog::class;

    protected string $title = '';

    protected function onLoad(): void
    {
        parent::onLoad();

        $this->title = __('moonshine::project/ui.resource.crawler_logs');
    }

    /**
     * @return list<FieldContract>
     */
    protected function indexFields(): iterable
    {
        return [
            ID::make()->sortable(),
            Text::make(__('moonshine::project/resources/crawler_logs.title'), 'title'),
            Url::make(__('moonshine::project/resources/crawler_logs.detail_url'), 'detail_url')->blank(),
            Date::make(__('moonshine::project/resources/crawler_logs.date_start'), 'date_start')->sortable(),
            Date::make(__('moonshine::ui.resource.created_at'), 'created_at')->sortable(),
        ];
    }


    /**
     * @return list<FieldContract>
     */
    protected function detailFields(): iterable
    {
        return [
            ID::make(),
            Text::make(__('moonshine::project/resources/crawler_logs.title'), 'title'),
            Url::make(__('moonshine::project/resources/crawler_logs.detail_url'), 'detail_url')->blank(),
            Date::make(__('moonshine::project/resources/crawler_logs.date_start'), 'date_start'),
            Date::make(__('moonshine::ui.resource.created_at'), 'created_at'),
        ];
    }

    /**
     * @param CrawlerLog $item
     *
     * @return array<string, string[]|string>
     * @see https://laravel.com/docs/validation#available-validation-rules
     */
    protected function rules(mixed $item): array
    {
        return [];
    }

    protected function activeActions(): ListOf
    {
        return new ListOf(Action::class, [Action::VIEW, Action::DELETE]);
    }
}
