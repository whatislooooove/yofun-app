<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Announcement extends Model
{
    protected $guarded = [];

    protected $casts = [
        'extra' => 'array'
    ];

    public function getDetailUrlAttribute($value)
    {
        return str_starts_with($value, 'https://') ? $value : 'https://' . $value;
    }

    public function scopeActive(Builder $query) {
        $query->where('is_active', true);
    }
}
