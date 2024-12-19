<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Document;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $document_id)
    {
        $document = Document::where('document_id', $document_id)->firstOrFail();

        // return Inertia::render('Documents/Edit', [
        //     'document' => $document,
        // ]);
        return $document;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
