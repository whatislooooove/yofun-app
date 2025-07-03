<?php

namespace app\Traits;

trait CustomizableModel
{
    public function countToday(): int {
        return $this->whereDate('date_start', today())->count();
    }

    public function countTotal(): int {
        return $this->active()->count();
    }

    public function isQuiz(): bool {
        return $this->type === 'quiz';
    }
}
