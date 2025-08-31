<?php

namespace App\Http\Middleware;

use App\Enums\Moonshine\AdvancedRoles;
use App\Enums\External\ProtectedRoutes;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ExternalServiceAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // TODO: дописать на провекру токена при обращении на роут прометеуса с сервиса прометеус
        // Нужно реализовать проверку на bearer token
        $userRole = auth('moonshine')->user()?->moonshineUserRole->id;

        if (ProtectedRoutes::tryFrom($request->route()->getName()) && !AdvancedRoles::tryFrom($userRole)) {
            abort(403, __('auth.forbidden'));
        }

        return $next($request);
    }
}
