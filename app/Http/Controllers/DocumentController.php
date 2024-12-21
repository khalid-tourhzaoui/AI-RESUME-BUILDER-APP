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



// Méthode updateThemeColor dans le contrôleur
public function updateThemeColor(Request $request, $id)
{
    $document = Document::findOrFail($id);

    $themeColor = $request->input('themeColor');
    // Ajoute un log pour vérifier la couleur reçue
    \Log::info("Couleur reçue : " . $themeColor);

    if ($themeColor) {
        $document->theme_color = $themeColor;
        $document->save();

        return response()->json([
            'request'   => $themeColor,
            'document'  => $document
        ]);
    }

    return response()->json(['error' => 'Couleur du thème non fournie'], 400);
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
