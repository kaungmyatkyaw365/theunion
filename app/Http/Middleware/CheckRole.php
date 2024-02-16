<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and has the required role
        if ($request->user() && in_array($request->user()->role, ['admin','m&e_manager'])) {
            return $next($request);
        }

        // Redirect or return response if the user doesn't have the required role
        abort(403, 'Unauthorized.');
    }
}
