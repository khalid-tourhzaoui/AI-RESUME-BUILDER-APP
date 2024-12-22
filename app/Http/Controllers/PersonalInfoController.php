<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;

class PersonalInfoController extends Controller
{
    public function store(Request $request, $document_id)
    {
        try{
            $validated = $request->validate([
                'first_name' => 'nullable|string|max:255',
                'last_name' => 'nullable|string|max:255',
                'email' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:15',
                'address' => 'nullable|string|max:500',
                'job_title' => 'nullable|string|max:255',
            ]);
            $document = Document::where('document_id', $document_id)->firstOrFail();
            $document->personalInfo()->create($validated);
            $document->thumbnail=$request->thumbnail;
            $document->save();
            return redirect()->route('documents.edit', $document->document_id)
                ->with('success', 'Personal information created successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }

    public function update(Request $request, $document_id)
    {
        try{
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
            $document->thumbnail=$request->thumbnail;
            $document->save();
            return redirect()->route('documents.edit', $document->document_id)
                ->with('success', 'Personal information updated successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
        // return $request->all();
    }

}
