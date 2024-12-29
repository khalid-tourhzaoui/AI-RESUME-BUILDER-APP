<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\App;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'locale' => fn() => App::getLocale(), // La langue actuelle
            'translations' => fn() => __('messages'), // Les traductions de Laravel
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
