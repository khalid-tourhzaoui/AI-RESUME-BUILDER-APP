<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
{
    if ($this->isMethod('post')) { // Pour la méthode store
        return [
            'experience' => 'required|array|min:1',
            'experience.*.title' => 'required|string|max:255',
            'experience.*.company_name' => 'required|string|max:255',
            'experience.*.city' => 'required|string|max:255',
            'experience.*.country' => 'required|string|max:255',
            'experience.*.work_summary' => 'required|string|max:1000',
            'experience.*.start_date' => 'required|date',
            'experience.*.end_date' => 'required|date|after_or_equal:experience.*.start_date',
        ];
    }

    if ($this->isMethod('put') || $this->isMethod('patch')) { // Pour la méthode update
        return [
            'experience' => 'required|array|min:1',
            'experience.*.id' => 'required|integer|exists:experiences,id',
            'experience.*.title' => 'required|string|max:255',
            'experience.*.company_name' => 'required|string|max:255',
            'experience.*.city' => 'required|string|max:255',
            'experience.*.country' => 'required|string|max:255',
            'experience.*.work_summary' => 'required|string|max:1000',
            'experience.*.start_date' => 'required|date',
            'experience.*.end_date' => 'required|date|after_or_equal:experience.*.start_date',
        ];
    }

    return [];
}
public function messages(): array
{
    return [
        'experience.required' => 'L\'expérience est obligatoire.',
        'experience.*.title.required' => 'Le titre est obligatoire pour chaque expérience.',
        'experience.*.start_date.required' => 'La date de début est obligatoire.',
        'experience.*.end_date.after_or_equal' => 'La date de fin doit être égale ou postérieure à la date de début.',
        'experience.*.id.exists' => 'L\'identifiant de l\'expérience est invalide.',
    ];
}

}
