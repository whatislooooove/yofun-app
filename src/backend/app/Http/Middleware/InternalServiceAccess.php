<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InternalServiceAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$this->isTokenValid($request)) abort(403, __('auth.unauthorized'));

        return $next($request);
    }

    private function isTokenValid(Request $request): bool
    {
        $expectedToken = 'Bearer ' . config('api.token');

        return $request->header('Authorization') === $expectedToken;
    }
}
