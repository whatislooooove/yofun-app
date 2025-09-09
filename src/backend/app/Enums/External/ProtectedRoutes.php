<?php

namespace App\Enums\External;

enum ProtectedRoutes: string
{
    // Swagger
    case API_PAGE = 'l5-swagger.default.api';
    case API_DOCS = 'l5-swagger.default.docs';

    // Prometheus
    case PROMETHEUS_DEFAULT = 'prometheus.default';

    // Horizon
    case HORIZON_DEFAULT = 'horizon.index';
}
