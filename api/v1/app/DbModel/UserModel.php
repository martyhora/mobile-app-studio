<?php

namespace App\DbModel;

class UserModel extends DbTableModel
{
    protected $tableName = 'user';

    public function fetchUserByCredentials(string $username, string $password): array
    {
        $user = $this->get('*', ['username' => $username]);

        if ($user === null || !password_verify($password, $user['password'])) {
            return [];
        }

        return $user;
    }

    protected function validateData(array $data)
    {
    }
}