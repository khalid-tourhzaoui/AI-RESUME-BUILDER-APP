<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Education;
use App\Models\Skill;
class SkillController extends Controller
{
    public function store(Request $request, $document_id)
    {
        $skillData = $request->skills;

        // Ajouter les nouveaux éléments uniquement s'ils n'existent pas déjà
        foreach ($skillData as $skill) {
            $existingRecord = Skill::where('document_id', $document_id)
                ->where('name', $skill['name'])
                ->where('rating', $skill['rating'])
                ->first();

            if (!$existingRecord) {
                Skill::create([
                    'document_id' => $document_id,
                    'name' => $skill['name'],
                    'rating' => $skill['rating'],
                ]);
            }
        }
        return response()->json([
            'message' => 'Skills added successfully.',
            'data'  => $skillData
        ]);

        // $EducationData=Education::where('document_id',$document_id)->first();
        // $documentData = $EducationData->document;

        // return redirect()->route('documents.edit', $documentData->document_id)
        //     ->with('success', 'Personal information updated successfully.');
    }
    //-----------------------------------------------------------------------------------------
    public function update(Request $request, $document_id)
    {
        $skillData = $request->skills;

        // Mettre à jour les éléments existants
        foreach ($skillData as $skill) {
            if (isset($skill['id'])) {
                Skill::where('id', $skill['id'])
                ->where('document_id', $document_id)
                ->update([
                    'name' => $skill['name'],
                    'rating' => $skill['rating'],
                ]);
            }
        }
        return response()->json([
            'message' => 'Skills added successfully.',
            'data'  => $skillData
        ]);
        // $EducationData=Education::where('document_id',$document_id)->first();
        // $documentData = $EducationData->document;

        // return redirect()->route('documents.edit', $documentData->document_id)
        //     ->with('success', 'Personal information updated successfully.');
    }
    //-----------------------------------------------------------------------------------------
    public function delete(Request $request,$id)
    {
        $skill=Skill::find($id);
        $skillData=Document::find($skill->document_id)->first();
        $skill->delete();
        return redirect()->route('documents.edit', $skillData->document_id)
            ->with('success', 'Personal information updated successfully.');
    }
}
