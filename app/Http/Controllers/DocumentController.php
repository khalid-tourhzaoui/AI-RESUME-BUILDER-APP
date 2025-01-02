<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Document;
use Inertia\Inertia;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;


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
    /*--------------------------------------------------------------------------------------------*/
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
            try{
                $validated = $request->validate([
                    'themeColor' => 'required|string|max:7', // Validation de la couleur hexadécimale
                ]);

                $document = Document::findOrFail($id);
                $document->theme_color = $request->themeColor;
                $document->save();
                return redirect()->back()->with('success','Document theme color updated successfully');
            }catch (\Exception $ex) {
                return redirect()->back()->with('error', 'An error occurred while updating the document. Please try again.');
            }

        }

    /*--------------------------------------------------------------------------------------------------*/
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $document_id)
    {
        try{
            $document = Document::where('document_id', $document_id)->where("user_id",auth()->user()->id)->firstOrFail();

            return Inertia::render('components/EditResume', [
                'document' => $document,
                'personalInfo'  =>  $document->personalInfo,
                'education'  =>  $document->education,
                'skills'  =>  $document->skills,
                'experience'  =>  $document->experience,
                'hobbies' => $document->hobbies,
                'languages' => $document->languages,
                'socialMedia' =>$document->socialMedias,
                'success' => session('success'),
                'error' => session('error'),
                'next' => session('next'),
                'locale' => app()->getLocale(),
            ]);
        }catch (\Exception $ex) {
            return redirect()->route('dashboard')
                ->with('error',$ex->getMessage());
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
                'summary' => 'nullable|string|max:1000',
            ]);

            $document->update([
                'summary' => $request->input('summary'),
                'current_position'=>3
            ]);
            return redirect()->route('documents.edit', $document->document_id)
                ->with(['success'=>'Document summary updated successfully']);

        } catch (\Exception $ex) {
            return redirect()->back()->with('error','Error! '.$ex->getMessage());
        }
    }

    //---------------------------------------------------------------------------
    public function updateDocumentStatus($id, $status)
    {
        try {
            // Validate the status
            $validStatuses = ['archived', 'private', 'public'];
            if (!in_array($status, $validStatuses)) {
                return redirect()->back()->with('error', 'Invalid status.');
            }

            // Retrieve the document by its ID
            $document = Document::findOrFail($id);

            // Update the status of the document
            $document->status = $status;
            $document->save();

            // Prepare the success message based on the status
            $statusMessages = [
                'archived' => 'Document archived successfully.',
                'private'  => 'Document restored successfully.',
                'public'   => 'Document updated successfully.'
            ];

            // Redirect to the document edit page with a success message
            return redirect()->back()->with('success', $statusMessages[$status]);

        } catch (\Exception $ex) {
            // Handle any exceptions
            return redirect()->back()
                ->with('error', 'An error occurred: ' . $ex->getMessage());
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
            return redirect()->back()->with('error',$ex->getMessage());
        }
    }
}
