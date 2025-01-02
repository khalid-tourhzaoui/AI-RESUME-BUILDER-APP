<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;
use App\Models\Document;
use App\Http\Requests\ExperienceRequest;
class ExperienceController extends Controller
{
    public function store(Request $request, $document_id)
    {
        try {
            // Validation des données de l'expérience
            $request->validate([
                'experience' => 'required|array|min:1',
                'experience.*.title' => 'required|string|max:255',
                'experience.*.company_name' => 'required|string|max:255',
                'experience.*.city' => 'required|string|max:255',
                'experience.*.country' => 'required|string|max:255',
                'experience.*.work_summary' => 'required|string|max:1000',
                'experience.*.start_date' => 'required|date',
                'experience.*.end_date' => 'required|date|after_or_equal:experience.*.start_date',
            ]);

            $experienceData = $request->experience;

            foreach ($experienceData as $experience) {
                // Vérification si une expérience existe déjà pour le document donné
                $existingRecord = Experience::where('document_id', $document_id)
                                ->where('id', $experience['id'] ?? null)
                                ->first();

                if ($existingRecord) {
                    // Si l'enregistrement existe déjà, mise à jour de l'expérience
                    $existingRecord->update([
                        'title' => $experience['title'],
                        'company_name' => $experience['company_name'],
                        'city' => $experience['city'],
                        'country' => $experience['country'],
                        'work_summary' => $experience['work_summary'],
                        'start_date' => $experience['start_date'],
                        'end_date' => $experience['end_date'],
                    ]);
                } else {
                    // Si l'enregistrement n'existe pas, création d'une nouvelle expérience
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

            // Mise à jour du document associé avec le thumbnail
            $ExperienceData = Experience::where('document_id', $document_id)->first();
            $documentData = $ExperienceData->document;
            $documentData->thumbnail = $request->thumbnail;
            $documentData->save();

            return redirect()->route('documents.edit', $documentData->document_id)
                            ->with('success', 'Experience saved successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                            ->with('error', 'Error: ' . $e->getMessage());
        }
    }
    //--------------------------------------------------------------------------------------------
    public function update(ExperienceRequest $request, $document_id)
    {
        // return response()->json([
        //     "methode" => "update",
        //     "request" =>$request->all()
        // ]);
        try {
            $request->validate([
                'experience' => 'required|array|min:1',
                'experience.*.id' => 'required|integer|exists:experiences,id',
                'experience.*.title' => 'required|string|max:255',
                'experience.*.company_name' => 'required|string|max:255',
                'experience.*.city' => 'required|string|max:255',
                'experience.*.country' => 'required|string|max:255',
                'experience.*.work_summary' => 'required|string|max:1000',
                'experience.*.start_date' => 'required|date',
                'experience.*.end_date' => 'required|date|after_or_equal:experience.*.start_date',
            ]);
            $experienceData = $request->experience;
            foreach ($experienceData as $experience) {
                if (isset($experience['id'])) {
                    // Mise à jour de l'expérience si l'ID existe
                    Experience::where('id', $experience['id'])
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

            // Mise à jour de la vignette du document
            $ExperiencesData = Experience::where('document_id', $document_id)->first();
            $documentData = $ExperiencesData->document;
            $documentData->thumbnail = $request->thumbnail;
            $documentData->save();

            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success', 'Experience updated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error! ' . $e->getMessage());
        }
    }

    //--------------------------------------------------------------------------------------------
    public function delete(Request $request,$id)
    {
        try{
            $experience=Experience::find($id);
            $documentData=Document::find($experience->document_id)->first();
            $experience->delete();
            return redirect()->route('documents.edit', $documentData->document_id)
                ->with('success','Experience deleted successfully');
        }catch(\Exception $e){
            return redirect()->back()
                ->with('error','Error! '.$e->getMessage());
        }
    }
}
