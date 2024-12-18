<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
class SocialiteController extends Controller
{
    // Redirect to the provider's authentication page
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    // Handle callback from the provider
    public function callback($provider)
    {
        // Get user data from the provider
        $socialUser = Socialite::driver($provider)->stateless()->user();

        // dd($socialUser); // You can uncomment this to debug the response

        // Find or create the user in the database
        $user = User::updateOrCreate(
            [
                'provider_id' => $socialUser->getId(),
                'provider' => $provider,
            ],
            [
                'name' => $provider=="google" ? $socialUser->getName():$socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
                'provider_token' => $socialUser->token, // Optional: Store the token
                'password' => bcrypt(str()->random(24)), // Generate a random password (since we're using OAuth)
            ]
        );

        // Log in the user
        Auth::login($user);

        // Check if the user's email is verified
        if (!$user->hasVerifiedEmail()) {
            // If email is not verified, send a verification email
            $user->sendEmailVerificationNotification();

            // Optionally, you can redirect the user to a page informing them to verify their email
            return redirect()->route('verification.notice');
        }

        // Redirect to intended dashboard (or another page)
        return redirect()->intended('/dashboard');
    }
}
