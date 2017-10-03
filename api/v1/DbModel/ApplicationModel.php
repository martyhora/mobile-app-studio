<?php

namespace DbModel;

class ApplicationModel extends \DbLib\DbTableModel
{
    protected $tableName = 'application';

    public function fetchAll(): array
    {
        $rows = $this->select('*');

        if ($rows === null) {
            return [];
        }

        return $rows;
    }

    public function fetchById($id, $columns = '*')
    {
        $row =  parent::fetchById($id, $columns);

        $row['menuItems'] = json_decode($row['menuItems']);

        return $row;
    }

    public function updateById($datas, $id)
    {
        unset($datas['id']);
        unset($datas['dateCreated']);

        $datas['menuItems'] = json_encode($datas['menuItems']);

        return parent::updateById($datas, $id);
    }
}
