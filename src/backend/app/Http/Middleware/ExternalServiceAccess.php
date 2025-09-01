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
     * @param  \Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        match (true) {
            $this->isProtectedRoute() && !$this->hasAccess() => abort(403, __('auth.forbidden')),
            default => null,
        };

        return $next($request);
    }

    private function isProtectedRoute(): bool
    {
        return !is_null(ProtectedRoutes::tryFrom(app(Request::class)->route()->getName()));
    }

    private function hasAccess(): bool
    {
        return $this->isAdmin() || $this->hasBearer();
    }

    private function isAdmin(): bool
    {
        $userRole = auth('moonshine')->user()?->moonshineUserRole->id;

        return !is_null(AdvancedRoles::tryFrom($userRole));
    }

    private function hasBearer(): bool
    {
        $expectedToken = 'Bearer ' . config('services.prometheus.auth_token');

        return app(Request::class)->header('Authorization') === $expectedToken;
    }
}
