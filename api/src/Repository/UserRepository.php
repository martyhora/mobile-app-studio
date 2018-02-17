<?php

namespace App\Repository;

use App\Entity\User;
use Symfony\Bridge\Doctrine\RegistryInterface;

class UserRepository extends BaseRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findUserByCredentials(string $username, string $password): ?User
    {
        $user = $this->findOneBy(['username' => $username]);

        if ($user === null || !password_verify($password, $user->getPassword())) {
            return null;
        }

        return $user;
    }
}
