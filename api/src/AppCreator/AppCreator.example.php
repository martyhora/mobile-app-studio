<?php

namespace App\AppCreator;

class AppCreatorExample implements IAppCreator
{
    public function createApplication($applicationId): string
    {
        $applicationId = (int) $applicationId;

        // replace method's body to generate needed application code
        $code = "// Generated application App #{$applicationId} code";

        $filePath = __DIR__ . '/../temp/application-' . sha1(time()) . '.txt';

        file_put_contents($filePath, $code);

        return $filePath;
    }
}
