<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Route as RoutingRoute;
use Illuminate\Support\Facades\Route;

class RouteController extends Controller
{
    public function routes()
    {
        $routes = Route::getRoutes();

        return collect($routes)->mapWithKeys(function (RoutingRoute $route) {
            return [
                $route->getName() => [
                    'url' => $route->uri(),
                    'method' => $route->methods()[0]
                ]
            ];
        });
    }
}
