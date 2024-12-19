<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;

class PersonalInfoController extends Controller
{
    public function store(Request $request, $document_id)
    {
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:500',
            'job_title' => 'nullable|string|max:255',
        ]);

        $document = Document::where('document_id', $document_id)->firstOrFail();

        // Crée une nouvelle entrée pour les informations personnelles
        $document->personalInfo()->create($validated);

        return redirect()->route('documents.edit', $document->document_id)
            ->with('success', 'Personal information created successfully.');
    }

    public function update(Request $request, $document_id)
    {
        $validated = $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|max:255',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:500',
            'job_title' => 'nullable|string|max:255',
        ]);

        $document = Document::where('document_id', $document_id)->firstOrFail();

        $document->personalInfo->update($validated);

        return redirect()->route('documents.edit', $document->document_id)
            ->with('success', 'Personal information updated successfully.');
    }


}
