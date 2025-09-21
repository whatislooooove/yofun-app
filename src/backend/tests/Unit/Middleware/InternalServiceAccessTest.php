<?php

namespace Tests\Unit\Http\Middleware;

use App\Http\Middleware\InternalServiceAccess;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class InternalServiceAccessTest extends TestCase
{
    public function test_valid_token()
    {
        $request = Request::create('/');
        $request->headers->set('Authorization', 'Bearer ' . config('api.token'));

        $middleware = new InternalServiceAccess();
        $response = $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('OK', $response->getContent());
    }

    public function test_invalid_token()
    {
        $this->expectException(\Exception::class);
        $request = Request::create('/');
        $request->headers->set('Authorization', 'Bearer 12345');

        $middleware = new InternalServiceAccess();
        $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });
    }

    public function test_without_token()
    {
        $this->expectException(\Exception::class);
        $request = Request::create('/');

        $middleware = new InternalServiceAccess();
        $middleware->handle($request, function ($req) {
            return new Response('OK', 200);
        });
    }
}
