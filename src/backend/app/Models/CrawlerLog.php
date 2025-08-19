<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CrawlerLog extends Model
{
    const null UPDATED_AT = null;

    protected $table = 'crawler_logs';
    protected $fillable = [
        'source_id',
        'title',
        'date_start',
        'detail_url',
        'created_at'
    ];
}
