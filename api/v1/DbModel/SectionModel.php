<?php

namespace DbModel;

class SectionModel extends \DbLib\DbTableModel
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
}
