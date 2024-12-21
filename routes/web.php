<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\PersonalInfoController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Models\Document;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth','verified'])->group(function () {
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');
    Route::get('documents/{document_id}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{document_id}', [DocumentController::class, 'update'])->name('documents.update');
    Route::patch('/documents/{document_id}', [DocumentController::class, 'UpdateSummary'])->name('documents.UpdateSummary');
    Route::post('/documents/{document_id}', [DocumentController::class, 'UpdateThemeColor'])->name('documents.UpdateThemeColor');
    Route::delete('/documents/{document_id}', [DocumentController::class, 'destroy'])->name('documents.delete');
    Route::patch('/documents/archive/{id}', [DocumentController::class, 'ArchivedDocument'])->name('documents.archive');
    Route::patch('/documents/restore/{id}', [DocumentController::class, 'RestoreDocument'])->name('documents.restore');

    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/personals/{document_id}', [PersonalInfoController::class, 'store'])->name('personals.store');
    Route::put('/personals/{document_id}', [PersonalInfoController::class, 'update'])->name('personals.update');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/education/{document_id}', [EducationController ::class, 'store'])->name('education.store');
    Route::put('/education/{document_id}', [EducationController ::class, 'update'])->name('education.update');
    Route::delete('/education/{document_id}', [EducationController::class, 'delete'])->name('education.delete');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/skill/{document_id}', [SkillController::class, 'store'])->name('skill.store');
    Route::put('/skill/{document_id}', [SkillController::class, 'update'])->name('skill.update');
    Route::delete('/skill/{document_id}', [SkillController::class, 'delete'])->name('skill.delete');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/experience/{document_id}', [ExperienceController::class, 'store'])->name('experience.store');
    Route::put('/experience/{document_id}', [ExperienceController::class, 'update'])->name('experience.update');
    Route::delete('/experience/{document_id}', [ExperienceController::class, 'delete'])->name('experience.delete');


});


Route::get('/dashboard', function () {
    $document=Document::where('user_id', Auth::id())->get();
    return Inertia::render('Dashboard')->with('document', $document);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('socialite.redirect');
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');


require __DIR__.'/auth.php';
