<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class LogAccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $validToken = config('logging.api_token');
        $token = $request->header('X-Log-Access-Token');

        \Log::info('Received token:', ['token' => $token]);
        \Log::info('Expected token:', ['validToken' => $validToken]);

        if ($token !== $validToken) {
            \Log::warning('Unauthorized access attempt to logs API', [
                'ip' => $request->ip(),
                'token' => $token,
            ]);
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
