<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Document;
use App\Models\Education;
class EducationController extends Controller
{
    public function update(Request $request, $document_id)
    {
        // return $request->all();
        try{
            $request->validate([
                'education' => 'required|array|min:1',
                'education.*.university_name' => 'required|string|max:50',
                'education.*.degree' => 'required|string|max:50',
                'education.*.description'=>'nullable|string|max:1000',
                'education.*.start_date' => 'required|date',
                'education.*.end_date' => 'required|date|after_or_equal:education.*.start_date',
            ]);
            $educationData = $request->education;
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
            $documentData->thumbnail=$request->thumbnail;
            $documentData->current_position=5;
            $documentData->save();
            // return $documentData;
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','Education information updated successfully.');
        }catch (\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
    //------------------------------------------------------------------------------------------------
    public function store(Request $request, $document_id)
    {
        try{
            $request->validate([
                'education' => 'required|array|min:1',
                'education.*.university_name' => 'required|string|max:50',
                'education.*.degree' => 'required|string|max:50',
                'education.*.description'=>'nullable|string|max:1000',
                'education.*.start_date' => 'required|date',
                'education.*.end_date' => 'required|date|after_or_equal:education.*.start_date',
            ]);
            $educationData = $request->education;
            foreach ($educationData as $education) {
                $existingRecord = Education::where('document_id', $document_id)
                    ->where('id', $education['id'] ?? null)
                    ->first();

                if($existingRecord){
                    $existingRecord->update([
                        'university_name' => $education['university_name'],
                        'degree' => $education['degree'],
                        'major' => $education['major'],
                        'description' => $education['description'],
                        'start_date' => $education['start_date'],
                        'end_date' => $education['end_date'],
                    ]);
                }else{
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
            $documentData->thumbnail=$request->thumbnail;
            $documentData->current_position=5;
            $documentData->save();
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','Education information addes successfully.');

        }catch (\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
    //------------------------------------------------------------------------------------------------
    public function delete(Request $request,$id)
    {
        try{
            $education=Education::find($id);
            $documentData=Document::find($education->document_id)->first();
            $education->delete();
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','Education information deleted successfully.');
        }catch (\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
}
