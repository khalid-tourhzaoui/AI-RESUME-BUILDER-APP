<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Education;
class EducationController extends Controller
{
    public function update(Request $request, $document_id)
    {
        $educationData = $request->education;

        // Mettre à jour les éléments existants
        foreach ($educationData as $education) {
            if (isset($education['id'])) {
                Education::where('id', $education['id'])
                    ->where('document_id', $document_id)
                    ->update([
                        'university_name' => $education['university_name'],
                        'degree' => $education['degree'],
                        'major' => $education['major'],
                        'description' => $education['description'],
                        'start_date' => $education['start_date'],
                        'end_date' => $education['end_date'],
                    ]);
            }
        }
        $EducationData=Education::where('document_id',$document_id)->first();
        $documentData = $EducationData->document;

        return redirect()->route('documents.edit', $documentData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }

    public function store(Request $request, $document_id)
    {
        $educationData = $request->education;

        // Ajouter les nouveaux éléments uniquement s'ils n'existent pas déjà
        foreach ($educationData as $education) {
            $existingRecord = Education::where('document_id', $document_id)
                ->where('university_name', $education['university_name'])
                ->where('degree', $education['degree'])
                ->where('start_date', $education['start_date'])
                ->where('end_date', $education['end_date'])
                ->first();

            if (!$existingRecord) {
                Education::create([
                    'document_id' => $document_id,
                    'university_name' => $education['university_name'],
                    'degree' => $education['degree'],
                    'major' => $education['major'],
                    'description' => $education['description'],
                    'start_date' => $education['start_date'],
                    'end_date' => $education['end_date'],
                ]);
            }
        }

        $EducationData=Education::where('document_id',$document_id)->first();
        $documentData = $EducationData->document;

        return redirect()->route('documents.edit', $documentData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }

    public function delete(Request $request,$id)
    {
        $education=Education::find($id);
        $education->delete();
        // Return a successful response
        $EducationData=Education::where('document_id',$document_id)->first();
        $documentData = $EducationData->document;

        return redirect()->route('documents.edit', $documentData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }






}
