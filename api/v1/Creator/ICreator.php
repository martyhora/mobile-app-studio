<?php

namespace Creator;

interface ICreator
{
    public function __construct(array $config);
    public function createApplication($applicationId): string;
}
