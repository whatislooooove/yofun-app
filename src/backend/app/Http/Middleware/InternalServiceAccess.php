<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InternalServiceAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$this->isTokenValid()) abort(403, __('auth.unauthorized'));

        return $next($request);
    }

    private function isTokenValid(): bool
    {
        $expectedToken = 'Bearer ' . config('api.token');

        return app(Request::class)->header('Authorization') === $expectedToken;
    }
}
