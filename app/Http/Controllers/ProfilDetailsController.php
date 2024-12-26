<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Language;
class ProfilDetailsController extends Controller
{
    public function store(Request $request, $document_id)
    {
        try {
            // Validate the incoming request
            $request->validate([
                'languages' => 'required|array|min:1',
                'languages.*.name' => 'required|string|max:255',
                'languages.*.level' => 'required|string|in:Native,Advanced,Intermediate', // specify allowed levels
            ]);

            $languagesData = $request->languages;

            // Loop through the languages and either create or update the language records
            foreach ($languagesData as $language) {
                // Check if the language already exists for the document
                $existingRecord = Language::where('document_id', $document_id)
                    ->where('name', $language['name'])
                    ->where('level', $language['level'])
                    ->first();

                // If the record does not exist, create it
                if (!$existingRecord) {
                    Language::create([
                        'document_id' => $document_id,
                        'name' => $language['name'],
                        'level' => $language['level'],
                    ]);
                }
            }

            // After inserting the new languages, update the document's thumbnail
            $dataLanguage = Language::where('document_id', $document_id)->first();
            $documentData = $dataLanguage->document;
            $documentData->thumbnail = $request->thumbnail;
            $documentData->save();

            // Redirect back to the document edit page with success message
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success', 'Languages added successfully.');

        } catch (\Exception $e) {
            // Catch any exceptions and return the error message
            return redirect()->back()
                ->with('error', 'Error! ' . $e->getMessage());
        }
    }

    //-----------------------------------------------------------------------------------------
    public function update(Request $request, $document_id)
    {
        try{
            $request->validate([
                'languages' => 'required|array|min:1',
                'languages.*.id' => 'required|integer|exists:languages,id',
                'languages.*.name' => 'required|string|max:255',
                'languages.*.level' => 'required|string|in:Native,Advanced,Intermediate',
            ]);
            $languageData = $request->languages;
            foreach ($languageData as $language) {
                if (isset($language['id'])) {
                    Language::where('id', $language['id'])
                    ->where('document_id', $document_id)
                    ->update([
                        'name' => $language['name'],
                        'level' => $language['level'],
                    ]);
                }
            }
            $DataLanguage=Language::where('document_id',$document_id)->first();
            $documentData = $DataLanguage->document;
            $documentData->thumbnail=$request->thumbnail;
            $documentData->save();
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','language updated successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
    //-----------------------------------------------------------------------------------------
    public function delete(Request $request,$id)
    {
        try{
            $language=Language::find($id);
            $languageData=Document::find($skill->document_id)->first();
            $language->delete();
            $languageData->thumbnail=$request->thumbnail;
            $languageData->save();
            return redirect()->route('documents.edit', $languageData->document_id)
                ->with('success','language deleted successfully.');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
}
