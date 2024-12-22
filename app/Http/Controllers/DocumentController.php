<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Document;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        try {
            $documents = Document::where('user_id', auth()->id())->get();
            return response()->json($documents);
        } catch (QueryException $ex) {
            if ($ex->getCode() === '2002') {
                return response()->json([
                    'error' => 'Le serveur de base de données est indisponible. Veuillez réessayer plus tard.'
                ], 503);
            }
            return response()->json([
                'error' => 'Une erreur s\'est produite lors de la récupération des données.'
            ], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try{
            return Inertia::render('components/AddResume');
        }catch (\Exception $ex) {
            // Vérifier si l'exception est due à une connexion refusée
            if ($ex->getCode() == 'HY000') {
                 return Inertia::render('components/errors/Error');
            } else {
                 return Inertia::render('components/errors/Error');
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $document = Document::create([
                'document_id' => Str::uuid(),
                'user_id' => auth()->id(),
                'title' => "Untitled Document",
            ]);

            return redirect()->route('documents.edit', ['document_id' => $document->document_id])
                ->with('success', 'Document created successfully. You can now edit it.');
        } catch (\Exception $ex) {
            if ($ex->getCode() === 'HY000') {

                return Inertia::render('components/errors/Error', [
                    'message' => 'Unable to connect to the database. Please try again later.'
                ]);
            }

            return redirect()->back()->with('error', 'An error occurred while creating the document. Please try again.');
            }
        }
        /*--------------------------------------------------------------------------------------------------*/
        public function updateThemeColor(Request $request, $id)
        {
            $document = Document::findOrFail($id);
            $document->theme_color = $request->themeColor;
            $document->save(); // Save the updated theme color to the database

            return response()->json([
                "color : " => $request->themeColor,
                "id : " => $id,
                "request : " => $request->all(),
            ]);
        }
    /*--------------------------------------------------------------------------------------------------*/
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $document_id)
    {
        try{
            $document = Document::where('document_id', $document_id)->firstOrFail();

            return Inertia::render('components/EditResume', [
                'document' => $document,
                'personalInfo'  =>  $document->personalInfo,
                'education'  =>  $document->education,
                'skills'  =>  $document->skills,
                'experience'  =>  $document->experience,
                'success' => session('success'),
                'error' => session('error'),
                'next' => session('next'),
            ]);
        }catch (\Exception $ex) {
            return redirect()->route('dashboard')
                ->with('error','The document you are trying to edit does not exist or you do not have permission to edit it.');
        }

    }
    /*--------------------------------------------------------------------------------------------------*/
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $document_id)
    {
        try {
            $document = Document::where('document_id', $document_id)->firstOrFail();
            $document->update([
                'title' => $request->input('title'),
            ]);

            return redirect()->route('documents.edit', $document->document_id)
                ->with('success', 'Document title updated successfully');
        } catch (\Exception $ex) {
            return redirect()->back()->with('error', 'An error occurred while updating the document. Please try again.');
        }
    }
    /*--------------------------------------------------------------------------------------------------*/
    public function UpdateSummary(Request $request, $document_id)
    {
        try {
            $document = Document::where('document_id', $document_id)->firstOrFail();

            $request->validate([
                'summary' => 'nullable|string|max:500',
            ]);

            $document->update([
                'summary' => $request->input('summary'),
            ]);
            return redirect()->route('documents.edit', $document->document_id)
                ->with(['success'=>'Document summary updated successfully']);

        } catch (\Exception $ex) {
            return redirect()->back()->with('error','Error! '.$ex->getMessage());
        }
    }

    //---------------------------------------------------------------------------
    public function ArchivedDocument($id){
        try {
            $document = Document::findOrFail($id);
            $document->status="archived";
            $document->save();
            return redirect()->route('documents.edit', $document->document_id)
            ->with('success','Document archived successfully');
        } catch (\Exception $ex) {
            return redirect()->back()
                ->with('error','Error! '.$ex->getMessage());
        }
    }
    //---------------------------------------------------------------------------
    public function RestoreDocument($id){
        try{
            $document = Document::findOrFail($id);
            $document->status="private";
            $document->save();
            return redirect()->route('documents.edit', $document->document_id)
            ->with('success','Document restored successfully');
        }catch (\Exception $ex) {
            return redirect()->back()->with('error','An error occurred while restoring the document. Please try again.');
        }
    }
    //---------------------------------------------------------------------------
    public function PublicDocument($id){
        try{
            $document = Document::findOrFail($id);
            $document->status="public";
            $document->save();
            return redirect()->route('documents.edit', $document->document_id)
            ->with('success','Document updated successfully');
        }catch(\Exception $ex){
            return redirect()->back()->with('error','An error occurred while updating the document. Please try again.');
        }
    }
    //---------------------------------------------------------------------------
    public function PreviewResume($document_id)
    {
        try {
            $isLoading = true;
            $isSuccess = false;

            $document = Document::where("document_id", $document_id)->first();

            if ($document && $document->status=="public") {
                $isLoading = false;
                $isSuccess = true;
                return Inertia::render('components/Preview/PublicResume', [
                    'document' => $document,
                    'personalInfo'  =>  $document->personalInfo,
                    'education'  =>  $document->education,
                    'skills'  =>  $document->skills,
                    'experience'  =>  $document->experience,
                    'isLoading' => $isLoading,
                    'isSuccess' => $isSuccess,
                ]);
            }else{
                return Inertia::render('components/errors/Error');
            }

        } catch (\Exception $e) {
            return response()->json('You',404);
        }
    }

    //---------------------------------------------------------------------------
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $document = Document::findOrFail($id);
            $document->delete();
            return redirect()->route('dashboard')
            ->with('success','Document deleted successfully');
        }catch (\Exception $ex) {
            return redirect()->back()->with('error','An error occurred while deleting the document. Please try again.');
        }
    }
}
