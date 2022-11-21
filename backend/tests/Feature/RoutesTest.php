<?php

namespace Tests\Feature;

use Tests\TestCase;

class RoutesTest extends TestCase
{
    public function test_application_provides_all_routes()
    {
        $response = $this->getJson(route('route.routes'));

        $response->assertStatus(200);

        dd($response->json());
    }
}
