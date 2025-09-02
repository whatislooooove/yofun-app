<?php

namespace app\Repositories;

use App\Models\Source;
use Illuminate\Database\Eloquent\Collection;

class SourceRepository
{
    public function getActiveSources(): Collection {
        return Source::where('is_active', true)->orderBy('created_at', 'desc')->get();
    }
}
