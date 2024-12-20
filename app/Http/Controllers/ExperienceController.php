<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;
use App\Models\Document;
class ExperienceController extends Controller
{
    public function store(Request $request, $document_id)
    {
        $experienceData = $request->experience;

        // Ajouter les nouveaux éléments uniquement s'ils n'existent pas déjà
        foreach ($experienceData as $experience) {
            $existingRecord = Experience::where('document_id', $document_id)
                ->where('title', $experience['title'])
                ->where('company_name', $experience['company_name'])
                ->where('city', $experience['city'])
                ->where('country', $experience['country'])
                ->where('work_summary', $experience['work_summary'])
                ->where('start_date', $experience['start_date'])
                ->where('end_date', $experience['end_date'])
                ->first();

            if (!$existingRecord) {
                Experience::create([
                    'document_id' => $document_id,
                    'title' => $experience['title'],
                    'company_name' => $experience['company_name'],
                    'city' => $experience['city'],
                    'country' => $experience['country'],
                    'work_summary' => $experience['work_summary'],
                    'start_date' => $experience['start_date'],
                    'end_date' => $experience['end_date'],
                ]);
            }
        }

        $ExperienceData=Experience::where('document_id',$document_id)->first();
        $documentData = $ExperienceData->document;

        return redirect()->route('documents.edit', $documentData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }
    //--------------------------------------------------------------------------------------------
    public function update(Request $request, $document_id)
    {
        $experienceData = $request->experience;

        // Mettre à jour les éléments existants
        foreach ($experienceData as $experience) {
            if (isset($experience['id'])) {
                experience::where('id', $experience['id'])
                    ->where('document_id', $document_id)
                        ->update([
                            'title' => $experience['title'],
                            'company_name' => $experience['company_name'],
                            'city' => $experience['city'],
                            'country' => $experience['country'],
                            'work_summary' => $experience['work_summary'],
                            'start_date' => $experience['start_date'],
                            'end_date' => $experience['end_date'],
                        ]);
            }
        }

        $ExperienceData=Experience::where('document_id',$document_id)->first();
        $documentData = $ExperienceData->document;

        return redirect()->route('documents.edit', $documentData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }
    //--------------------------------------------------------------------------------------------
    public function delete(Request $request,$id)
    {
        $experience=Experience::find($id);
        $documentData=Document::find($experience->document_id)->first();
        $experience->delete();
        return redirect()->route('documents.edit', $documentData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }
}
