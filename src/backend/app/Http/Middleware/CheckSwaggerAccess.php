<?php

namespace App\Http\Middleware;

use App\Enums\Moonshine\AdvancedRoles;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSwaggerAccess
{
    final const SWAGGER_ROUTE = 'l5-swagger.default.api';
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $userRole = auth('moonshine')->user()?->moonshineUserRole->id;

        if ($request->route()->getName() === self::SWAGGER_ROUTE && !AdvancedRoles::tryFrom($userRole)) {
            abort(403, 'This page only for admins');
        }

        return $next($request);
    }
}
