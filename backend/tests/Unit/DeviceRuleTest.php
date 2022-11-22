<?php

namespace Tests\Unit;

use App\Rules\DeviceRule;
use Tests\TestCase;

class DeviceRuleTest extends TestCase
{
    public function test_device_rule_does_not_fail_while_obtaining_message()
    {
        (new DeviceRule)->message();

        $this->assertTrue(true);
    }
}
