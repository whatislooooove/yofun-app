<?php

namespace Tests\Unit\Http\Middleware;

use App\Http\Middleware\ExternalServiceAccess;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use App\Enums\External\ProtectedRoutes;

class ExternalServiceAccessTest extends TestCase
{
    public function test_protected_route_with_valid_token()
    {
        config(['services.prometheus.auth_token' => 'valid-token']);

        $request = Request::create('/protected-route');
        $request->headers->set('Authorization', 'Bearer valid-token');

        $request->setRouteResolver(function () {
            $route = new \Illuminate\Routing\Route('GET', '/protected-route', function () {});
            $route->name(ProtectedRoutes::cases()[0]->value);
            return $route;
        });

        $middleware = new ExternalServiceAccess();
        $response = $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('OK', $response->getContent());
    }

    public function test_protected_route_with_invalid_token()
    {
        $this->expectException(\Exception::class);

        config(['services.prometheus.auth_token' => 'valid-token']);

        $request = Request::create('/protected-route');
        $request->headers->set('Authorization', 'Bearer invalid-token');

        $request->setRouteResolver(function () {
            $route = new \Illuminate\Routing\Route('GET', '/protected-route', function () {});
            $route->name(ProtectedRoutes::cases()[0]->value);
            return $route;
        });

        $middleware = new ExternalServiceAccess();
        $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });
    }

    public function test_protected_route_without_token()
    {
        $this->expectException(\Exception::class);

        config(['services.prometheus.auth_token' => 'valid-token']);

        $request = Request::create('/protected-route');
        $request->setRouteResolver(function () {
            $route = new \Illuminate\Routing\Route('GET', '/protected-route', function () {});
            $route->name(ProtectedRoutes::cases()[0]->value);
            return $route;
        });

        $middleware = new ExternalServiceAccess();
        $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });
    }

    public function test_unprotected_route_without_anything()
    {
        $request = Request::create('/unprotected-route');

        $request->setRouteResolver(function () {
            $route = new \Illuminate\Routing\Route('GET', '/unprotected-route', function () {});
            $route->name('some.unprotected.route');
            return $route;
        });

        $middleware = new ExternalServiceAccess();
        $response = $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('OK', $response->getContent());
    }
}
