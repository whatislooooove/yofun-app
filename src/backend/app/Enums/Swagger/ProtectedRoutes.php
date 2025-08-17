<?php

namespace App\Enums\Swagger;

enum ProtectedRoutes: string
{
    case API_PAGE = 'l5-swagger.default.api';
    case API_DOCS = 'l5-swagger.default.docs';
}
