<?php

namespace App\Models;

use app\Traits\Model\CustomizableModel;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use CustomizableModel;
    protected $guarded = [];

    protected $casts = [
        'extra' => 'array'
    ];

    public function getDetailUrlAttribute($value)
    {
        return str_starts_with($value, 'https://') ? $value : 'https://' . $value;
    }

    public function scopeActive(Builder $query) {
        $query->where('is_active', true)
            ->where('date_start', '>', Carbon::now())
            ->orderBy('date_start', 'ASC');
    }

    public function scopeQuizzes(Builder $query) {
        $query->where('type', 'quiz');
    }

    public function scopeEvents(Builder $query) {
        $query->where('type', 'default');
    }
}
