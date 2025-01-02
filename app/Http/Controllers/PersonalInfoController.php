<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use Illuminate\Support\Facades\Log;

class PersonalInfoController extends Controller
{
    private function validationRules()
    {
        return [
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:13',
            'address' => 'nullable|string|max:500',
            'job_title' => 'nullable|string|max:255',
            'thumbnail' => 'nullable|string',
        ];
    }

    public function store(Request $request, $document_id)
    {
        try {
            $validated = $request->validate($this->validationRules());
            $document = Document::where('document_id', $document_id)->firstOrFail();

            // Créer les informations personnelles associées
            $document->personalInfo()->create($validated);

            // Mettre à jour la miniature si elle est fournie
            if ($request->filled('thumbnail')) {
                $document->thumbnail = $request->thumbnail;
                $document->current_position=2;
                $document->save();
            }

            return redirect()->route('documents.edit', $document->document_id)
                ->with('success', 'Personal information created successfully.');
        } catch (\Exception $e) {
            Log::error("Error storing personal info: " . $e->getMessage());
            return redirect()->back()->with('error',$e->getMessage());
        }
    }

    public function update(Request $request, $document_id)
    {
        try {
            $validated = $request->validate($this->validationRules());
            $document = Document::where('document_id', $document_id)->firstOrFail();

            // Vérifiez si les informations personnelles existent avant de les mettre à jour
            if ($document->personalInfo) {
                $document->personalInfo->update($validated);
            } else {
                return redirect()->back()->with('error', 'Personal information not found.');
            }

            // Mettre à jour la miniature si elle est fournie
            if ($request->filled('thumbnail')) {
                $document->thumbnail = $request->thumbnail;
                $document->current_position=2;
                $document->save();
            }

            return redirect()->route('documents.edit', $document->document_id)
                ->with('success', 'Personal information updated successfully.');
        } catch (\Exception $e) {
            Log::error("Error updating personal info: " . $e->getMessage());
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
