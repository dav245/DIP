<?php

namespace App\Enums;

class MessageType
{
    protected static $singletons = [];

    protected const TYPE_DRAFT = 'draft';
    protected const TYPE_SENT = 'sent';
    protected const TYPE_RECEIVED = 'received';

    protected function __construct(protected string $type)
    {
    }

    protected static function make(string $type): self
    {
        if (!isset(static::$singletons[$type])) {
            static::$singletons[$type] = new MessageType($type);
        }

        return static::$singletons[$type];
    }

    public static function DRAFT(): self
    {
        return static::make(static::TYPE_DRAFT);
    }

    public static function SENT(): self
    {
        return static::make(static::TYPE_SENT);
    }

    public static function RECEIVED(): self
    {
        return static::make(static::TYPE_RECEIVED);
    }

    public function type(): string
    {
        return $this->type;
    }

    public static function values(): array
    {
        return [
            static::DRAFT(),
            static::SENT(),
            static::RECEIVED(),
        ];
    }

    public function __toString()
    {
        return $this->type;
    }
}
