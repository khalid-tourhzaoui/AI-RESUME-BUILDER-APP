<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class SocialiteController extends Controller
{
    // Redirige vers la page de connexion du fournisseur
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    // Callback après l'authentification avec le fournisseur
    public function callback($provider)
    {
        // Récupérer les informations utilisateur du fournisseur
        $socialUser = Socialite::driver($provider)->stateless()->user();

        // Mettre à jour ou créer un utilisateur dans la base de données
        $user = User::updateOrCreate(
            [
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
            ],
            [
                'name' => $provider === "google" ? $socialUser->getName() : $socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
                'provider_token' => $socialUser->token,
                'password' => bcrypt(str()->random(24)), // Générer un mot de passe aléatoire
            ]
        );

        // Si l'utilisateur a utilisé un fournisseur (Google, GitHub), il faut vérifier si l'email est vérifié
        if ($user->provider !== 'normal') {
            // Si l'email n'est pas vérifié, envoyer un lien de réinitialisation de mot de passe
            if (!$user->hasVerifiedEmail()) {
                // Rediriger vers la page de réinitialisation de mot de passe
                return redirect()->route('password.request');
            }
        }

        // Si l'utilisateur est enregistré normalement et a vérifié son email
        if ($user->provider === 'normal' && !$user->hasVerifiedEmail()) {
            // Rediriger vers la page de vérification d'email
            return redirect()->route('verification.notice');
        }

        // Connecter l'utilisateur
        Auth::login($user);

        // Rediriger vers le tableau de bord ou une autre page après la connexion
        return redirect()->intended('/dashboard');
    }
}
