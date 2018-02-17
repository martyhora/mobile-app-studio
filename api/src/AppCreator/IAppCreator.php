<?php

namespace App\AppCreator;

interface IAppCreator
{
    public function createApplication($applicationId): string;
}
