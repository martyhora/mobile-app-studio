<?php

namespace DbLib;

use Medoo\Medoo;

abstract class DbTableModel
{
    protected $database;

    protected $tableName;

    protected $primaryKey = 'id';

    public function __construct(Medoo $database)
    {
        $this->database = $database;
    }

    public function select($join, $columns = null, $where = null)
    {
        return $this->database->select($this->tableName, $join, $columns, $where);
    }

    public function get($join = null, $columns = null, $where = null)
    {
        return $this->database->get($this->tableName, $join, $columns, $where);
    }

    public function insert($datas)
    {
        return $this->database->insert($this->tableName, $datas);
    }

    public function update($datas, $where)
    {
        return $this->database->update($this->tableName, $datas, $where);
    }

    public function updateById($datas, $id)
    {
        return $this->update($datas, [$this->primaryKey => $id]);
    }

    public function fetchById($id, $columns = '*')
    {
        return $this->get($columns, [$this->primaryKey => $id]);
    }

    public function delete($where)
    {
        return $this->database->delete($this->tableName, $where);
    }
}
