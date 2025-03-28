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
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProfilDetailsController;
use App\Models\Document;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\LogController;
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth','verified'])->group(function () {
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('documents', [DocumentController::class, 'store'])->name('documents.store');
    Route::get('documents/{document_id}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{document_id}', [DocumentController::class, 'update'])->name('documents.update');
    Route::patch('/documents/{document_id}', [DocumentController::class, 'UpdateSummary'])->name('documents.UpdateSummary');
    Route::get('/documents/{id}/updateThemeColor', [DocumentController::class, 'updateThemeColor'])->name('documents.UpdateThemeColor');
    Route::delete('/documents/{document_id}', [DocumentController::class, 'destroy'])->name('documents.delete');
    Route::get('document/{id}/status/{status}', [DocumentController::class, 'updateDocumentStatus'])->name('documents.updateStatus');
    Route::get('/preview/{document_id}/resume', [DocumentController::class, 'PreviewResume'])->name('documents.preview');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/profile-details/{document_id}/', [ProfilDetailsController::class, 'store'])->name('profile-details.store');
    Route::put('/profile-details/{document_id}/', [ProfilDetailsController::class, 'update'])->name('profile-details.update');
    Route::delete('/profile-details/{document_id}/', [ProfilDetailsController::class, 'destroy'])->name('profile-details.delete');
    Route::post('/profile-image/{document_id}/', [ProfilDetailsController::class, 'upload'])->name('profile-details.upload');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/personals/{document_id}', [PersonalInfoController::class, 'store'])->name('personals.store');
    Route::put('/personals/{document_id}', [PersonalInfoController::class, 'update'])->name('personals.update');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/education/{document_id}', [EducationController ::class, 'store'])->name('education.store');
    Route::put('/education/{document_id}', [EducationController ::class, 'update'])->name('education.update');
    Route::delete('/education/{document_id}', [EducationController::class, 'delete'])->name('education.delete');
    // ----------------------------------------------------------------------------------------------------------------------
    Route::post('/experience/{document_id}', [ExperienceController::class, 'store'])->name('experience.store');
    Route::put('/experience/{document_id}', [ExperienceController::class, 'update'])->name('experience.update');
    Route::delete('/experience/{document_id}', [ExperienceController::class, 'delete'])->name('experience.delete');


});


Route::get('/dashboard', function () {
    try {
        $document=Document::where('user_id', Auth::id())->get();
        return Inertia::render('Dashboard')->with(['document'=>$document,'success' => session('success'),
                'error' => session('error'),'locale'=>app()->getLocale(),]);
    } catch (\Exception $ex) {
        // Vérifier si l'exception est due à une connexion refusée
        if ($ex->getCode() == 'HY000') {
             return Inertia::render('components/errors/Error');
        } else {
             return Inertia::render('components/errors/Error');
        }
    }
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('log.access')->group(function () {
    Route::get('/api/logs', [LogController::class, 'index']);
});
Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirect'])->name('socialite.redirect');
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'callback'])->name('socialite.callback');


require __DIR__.'/auth.php';
