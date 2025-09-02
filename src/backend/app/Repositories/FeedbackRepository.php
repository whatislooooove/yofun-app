<?php

namespace app\Repositories;

use App\Models\Feedback;

class FeedbackRepository
{
    public function create(array $data): Feedback
    {
        return Feedback::create($data);
    }
}
