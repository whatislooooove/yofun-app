<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $guarded = [];

    protected $casts = [
        'extra' => 'array'
    ];

    public function getDetailUrlAttribute($value)
    {
        return 'https://' . $value;
    }
}
