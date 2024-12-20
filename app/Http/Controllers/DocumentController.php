<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Document;
use Inertia\Inertia;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Document::where('user_id', auth()->id())->get());
        // return Inertia::render('components/ResumeList', [
        //     'documents' => Document::where('user_id', auth()->id())->get(),
        // ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('components/AddResume', [
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $document = Document::create([
            'document_id' => Str::uuid(),
            'user_id' => auth()->id(),
            'title' => "Untitled Document",
        ]);

        return redirect()->route('documents.edit', ['document_id' => $document->document_id])
            ->with([
                'status' => 'Document created.',
            ]);
    }



    public function updateThemeColor(Request $request, $id)
    {
        $document = Document::findOrFail($id);
        $document->update([
            'theme_color' => $request->input('themeColor')
        ]);

        return response()->json(['message' => 'Theme color updated successfully']);
    }





    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $document_id)
    {
        $document = Document::where('document_id', $document_id)->firstOrFail();
        return Inertia::render('components/EditResume', [
            'document' => $document,
            'personalInfo'  =>  $document->personalInfo,
            'education'  =>  $document->education,
            'skills'  =>  $document->skills,
            'experience'  =>  $document->experience,
        ]);
        // return $document->personalInfo;
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $document_id)
    {
        $document = Document::where('document_id', $document_id)->firstOrFail();
        $document->update([
            'title' => $request->input('title'),
        ]);

        return redirect()->route('documents.edit', $document->document_id)
            ->with('success', 'Document title updated successfully');
    }

    public function UpdateSummary(Request $request, $document_id)
    {
        $document = Document::where('document_id', $document_id)->firstOrFail();
        // return $request->all();
        $document->update([
            'summary' => $request->input('summary'),
        ]);

        return redirect()->route('documents.edit', $document->document_id)
            ->with('success', 'Document title updated successfully');
    }
    //---------------------------------------------------------------------------
    public function ArchivedDocument($id){
        $document = Document::findOrFail($id);
        $document->status="archived";
        $document->save();

        return response()->json([
            'message' => 'Document updated',
            'document' => $document
        ]);
    }
    //---------------------------------------------------------------------------
    public function RestoreDocument($id){
        $document = Document::findOrFail($id);
        $document->status="private";
        $document->save();

        return response()->json([
            'message' => 'Document updated',
            'document' => $document
        ]);
    }
    //---------------------------------------------------------------------------
    public function PublicDocument($id){
        $document = Document::findOrFail($id);
        $document->status="public";
        $document->save();

        return response()->json([
            'message' => 'Document updated',
            'document' => $document
        ]);
    }
    //---------------------------------------------------------------------------
    public function PreviewResume($document_id)
    {
        try {
            // Set isLoading to true initially
            $isLoading = true;
            $isSuccess = false;

            // Fetch the document by its ID
            $document = Document::where("document_id", $document_id)->first();

            // If the document is found, set isSuccess to true
            if ($document) {
                $isLoading = false;
                $isSuccess = true;
            }

            // Return Inertia response with document and status flags
            return Inertia::render('components/Preview/PublicResume', [
                'document' => $document,
                'isLoading' => $isLoading,
                'isSuccess' => $isSuccess,
            ]);
        } catch (\Exception $e) {
            // If any error occurs, set isLoading to false and isSuccess to false
            return Inertia::render('components/Preview/PublicResume', [
                'document' => null,
                'isLoading' => false,
                'isSuccess' => false,
            ]);
        }
    }



    //---------------------------------------------------------------------------
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);
        $document->delete();

        return response()->json([
            'message' => 'Document deleted',
            'document' => $document
        ]);
    }
}
