<?php

namespace App\DbModel;

class SectionModel extends DbTableModel
{
    protected $tableName = 'section';

    public function fetchBySceneId(int $sceneId): array
    {
        $rows = $this->select('*', ['sceneId' => $sceneId]);

        if ($rows === null) {
            return [];
        }

        return $rows;
    }

    protected function validateData(array $data)
    {
    }
}
