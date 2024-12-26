<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Language;
use App\Models\Document;
use App\Models\SocialMedia;
use App\Models\Skill;
class ProfilDetailsController extends Controller
{
    public function store(Request $request, $document_id)
    {
        try {
            // Define validation rules for each type
            $rules = [
                'languages' => [
                    'languages' => 'required|array|min:1',
                    'languages.*.name' => 'required|string|max:255',
                    'languages.*.level' => 'required|string|in:Native,Advanced,Intermediate',
                ],
                'social_medias' => [
                    'social_medias' => 'required|array|min:1',
                    'social_medias.*.name' => 'required|string|max:255',
                    'social_medias.*.link' => 'required|max:255',
                ],
                'skills' => [
                    'skills' => 'required|array|min:1',
                    'skills.*.name' => 'required|string|max:255',
                    'skills.*.rating' => 'required|integer|between:1,5',
                ],
            ];

            // Process request based on the data type
            if ($request->has('languages')) {
                $this->processEntity(
                    $request,
                    $rules['languages'],
                    Language::class,
                    $document_id
                );
            }if ($request->has('social_medias')) {
                $this->processEntity(
                    $request,
                    $rules['social_medias'],
                    SocialMedia::class,
                    $document_id
                );
            }if ($request->has('skills')) {
                $this->processEntity(
                    $request,
                    $rules['skills'],
                    Skill::class,
                    $document_id
                );
            }
            $document=Document::find($document_id);

            return redirect()
                ->route('documents.edit', $document->document_id)
                ->with('success', 'Data saved successfully!');
        } catch (\Exception $e) {
            \Log::error('Error saving data: ' . $e->getMessage());
            return redirect()->back()
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Process the entity data: validate, check existence, and save new records.
     */
    private function processEntity($request, $rules, $model, $document_id)
    {
        $request->validate($rules);

        $dataKey = array_keys($rules)[0]; // e.g., 'languages', 'social_medias', 'skills'
        $data = $request->get($dataKey);

        foreach ($data as $item) {
            $existingRecord = $model::where('document_id', $document_id)
            ->where('name', $item['name'])
            // ->where($model === Skill::class ? 'rating' : ($model === SocialMedia::class ? 'link' : 
            //        ($model===Language::class ? 'level':null)))
            ->where($model === Skill::class ? 'rating' : ($model === SocialMedia::class ? 'link' : 'level'), $item['rating'] ?? $item['link'] ?? $item['level'] ?? null)
            ->first();

            if (!$existingRecord) {
                if ($model === Skill::class) {
                    $model::create([
                        'document_id' => $document_id,
                        'name' => $item['name'],
                        'rating' => $item['rating'],
                    ]);
                } elseif ($model === SocialMedia::class) {
                    $model::create([
                        'document_id' => $document_id,
                        'name' => $item['name'],
                        'link' => $item['link'],
                    ]);
                } elseif ($model === Language::class) {
                    $model::create([
                        'document_id' => $document_id,
                        'name' => $item['name'],
                        'level' => $item['level'],
                    ]);
                }
            }
        }
    }


    //-----------------------------------------------------------------------------------------
    public function update(Request $request, $document_id)
{
    try {
        // Define validation rules for each type
        $rules = [
            'languages' => [
                'languages' => 'required|array|min:1',
                'languages.*.id' => 'sometimes|integer|exists:languages,id',
                'languages.*.name' => 'required|string|max:255',
                'languages.*.level' => 'required|string|in:Native,Advanced,Intermediate',
            ],
            'social_medias' => [
                'social_medias' => 'required|array|min:1',
                'social_medias.*.id' => 'sometimes|integer|exists:social_media,id',
                'social_medias.*.name' => 'required|string|max:255',
                'social_medias.*.link' => 'required|url|max:255',
            ],
            'skills' => [
                'skills' => 'required|array|min:1',
                'skills.*.id' => 'sometimes|integer|exists:skills,id',
                'skills.*.name' => 'required|string|max:255',
                'skills.*.rating' => 'required|integer|between:1,5',
            ],
        ];

        // Process request based on the data type
        if ($request->has('languages')) {
            $this->updateEntity(
                $request,
                $rules['languages'],
                Language::class,
                $document_id
            );
        }
        if ($request->has('social_medias')) {
            $this->updateEntity(
                $request,
                $rules['social_medias'],
                SocialMedia::class,
                $document_id
            );
        }
        if ($request->has('skills')) {
            $this->updateEntity(
                $request,
                $rules['skills'],
                Skill::class,
                $document_id
            );
        }

        // Update document thumbnail if provided
        if ($request->has('thumbnail')) {
            $documentData = Document::find($document_id);
            if ($documentData) {
                $documentData->thumbnail = $request->thumbnail;
                $documentData->save();
            }
        }
        $document = Document::find($document_id);

        return redirect()
            ->route('documents.edit', $document->document_id)
            ->with('success', 'Data updated successfully!');
    } catch (\Exception $e) {
        \Log::error('Error updating data: ' . $e->getMessage());
        return redirect()->back()
            ->with('error', $e->getMessage());
    }
}

/**
 * Update the entity data: validate, check existence, and update records.
 */
private function updateEntity($request, $rules, $model, $document_id)
{
    $request->validate($rules);

    $dataKey = array_keys($rules)[0]; // e.g., 'languages', 'social_medias', 'skills'
    $data = $request->get($dataKey);

    foreach ($data as $item) {
        if (isset($item['id'])) {
            $query = $model::where('id', $item['id'])
                ->where('document_id', $document_id);

            if ($model === Language::class) {
                $query->update([
                    'name' => $item['name'],
                    'level' => $item['level'],
                ]);
            } elseif ($model === SocialMedia::class) {
                $query->update([
                    'name' => $item['name'],
                    'link' => $item['link'],
                ]);
            } elseif ($model === Skill::class) {
                $query->update([
                    'name' => $item['name'],
                    'rating' => $item['rating'],
                ]);
            }
        } else {
            if ($model === Skill::class) {
                $model::create([
                    'document_id' => $document_id,
                    'name' => $item['name'],
                    'rating' => $item['rating'],
                ]);
            } elseif ($model === SocialMedia::class) {
                $model::create([
                    'document_id' => $document_id,
                    'name' => $item['name'],
                    'link' => $item['link'],
                ]);
            } elseif ($model === Language::class) {
                $model::create([
                    'document_id' => $document_id,
                    'name' => $item['name'],
                    'level' => $item['level'],
                ]);
            }
        }
    }
}
    //-----------------------------------------------------------------------------------------
    public function destroy(Request $request,$id)
    {
        // return $request->all();
        try{
            if($request->has('languages')){
                $language=Language::find($id);
                $language->delete();
            }elseif($request->has('social_medias')){
                $social_media=SocialMedia::find($id);
                $social_media->delete();
            }elseif($request->has('skills')){
                $skill=Skill::find($id);
                $skill->delete();
            }
            return redirect()->back()->with('success','Data deleted successfully!');
        }catch(\Exception $e){
            \Log::error('Error deleting data: '.$e->getMessage());
            return redirect()->back()->with('error',$e->getMessage());
        }
    }
}
