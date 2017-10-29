<?php

namespace DbModel;

class SceneModel extends \DbLib\DbTableModel
{
    protected $tableName = 'scene';

    public function fetchAll(): array
    {
        $rows = $this->select('*');

        if ($rows === null) {
            return [];
        }

        foreach ($rows as &$row) {
            $row['sections'] = json_decode($row['sections']);
        }

        return $rows;
    }

    public function fetchSectionsBySceneId(int $sceneId)
    {
        $scene = $this->fetchById($sceneId);

        if (!$scene['sections']) {
            return [];
        }

        return json_decode($scene['sections']);
    }

    public function fetchScenesByApplicationId(int $applicationId)
    {
        $rows = $this->select('*', ['applicationId' => $applicationId]);

        if ($rows === null) {
            return [];
        }

        foreach ($rows as &$row) {
            $row['sections'] = $row['sections'] ? json_decode($row['sections']) : [];
        }

        return $rows;
    }

    public function fetchScenesToApplicationBySceneId(int $sceneId)
    {
        $applicationId = $this->fetchById($sceneId, 'applicationId');

        if (!$applicationId) {
            return [];
        }

        return $this->fetchScenesByApplicationId($applicationId);
    }

    public function insert($datas)
    {
        unset($datas['id']);

        $datas['sections'] = json_encode($datas['sections']);

        return parent::insert($datas);
    }

    public function update($datas, $where)
    {
        return parent::update($datas, $where);
    }

    protected function validateData(array $data)
    {
        $errors = [];

        if (empty($data['title'])) {
            $errors[] = 'Please, fill in all form inputs';
        }

        return $errors;
    }
}
