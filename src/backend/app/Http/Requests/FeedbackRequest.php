<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FeedbackRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255', 'min:2'],
            'email' => ['required', 'email', 'max:255'],
            'telegram' => ['nullable', 'string', 'min:2', 'max:128', 'starts_with:@'],
            'subject' => ['required', 'max:255'],
            'message' => ['required', 'max:16384'],
        ];
    }
}
