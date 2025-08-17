<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\Models\Feedback;

use MoonShine\Laravel\Enums\Action;
use MoonShine\Laravel\Resources\ModelResource;
use MoonShine\Support\ListOf;
use MoonShine\UI\Fields\Date;
use MoonShine\UI\Fields\ID;
use MoonShine\Contracts\UI\FieldContract;
use MoonShine\UI\Fields\Text;

/**
 * @extends ModelResource<Feedback>
 */
class FeedbackResource extends ModelResource
{
    protected string $model = Feedback::class;

    protected string $title = '';

    protected function onLoad(): void
    {
        parent::onLoad();

        $this->title = __('moonshine::project/ui.resource.feedbacks');
    }

    /**
     * @return list<FieldContract>
     */
    protected function indexFields(): iterable
    {
        return [
            ID::make()->sortable(),
            Text::make(__('moonshine::project/resources/feedback.name'), 'name'),
            Text::make(__('moonshine::ui.resource.email'), 'email'),
            Text::make(__('moonshine::project/resources/feedback.subject'), 'subject'),
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
            Text::make(__('moonshine::project/resources/feedback.name'), 'name'),
            Text::make(__('moonshine::ui.resource.email'), 'email'),
            Text::make(__('moonshine::project/resources/feedback.subject'), 'subject'),
            Text::make(__('moonshine::project/resources/feedback.message'), 'message'),
            Date::make(__('moonshine::ui.resource.created_at'), 'created_at'),
        ];
    }

    /**
     * @param Feedback $item
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
