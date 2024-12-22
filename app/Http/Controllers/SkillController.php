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
        try{
            $request->validate([
                'skills' => 'required|array|min:1',
                'skills.*.name' => 'required|string|max:255',
                'skills.*.rating' => 'required|integer|between:1,5',
            ]);
            $skillData = $request->skills;
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
            $DataSkill=Skill::where('document_id',$document_id)->first();
            $documentData = $DataSkill->document;
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','Skills added successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }

    }
    //-----------------------------------------------------------------------------------------
    public function update(Request $request, $document_id)
    {
        try{
            $request->validate([
                'skills' => 'required|array|min:1',
                'skills.*.id' => 'required|integer|exists:skills,id',
                'skills.*.name' => 'required|string|max:255',
                'skills.*.rating' => 'required|integer|between:1,5',
            ]);
            $skillData = $request->skills;
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
            $DataSkill=Skill::where('document_id',$document_id)->first();
            $documentData = $DataSkill->document;
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','Skills updated successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
    //-----------------------------------------------------------------------------------------
    public function delete(Request $request,$id)
    {
        try{
            $skill=Skill::find($id);
            $skillData=Document::find($skill->document_id)->first();
            $skill->delete();
            return redirect()->route('documents.edit', $skillData->document_id)
                ->with('success','Skill deleted successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
}
