<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query;

abstract class BaseRepository extends ServiceEntityRepository
{
    public function findById(int $id): array
    {
        return $this->createQueryBuilder('q')
            ->where('q.id = :value')->setParameter('value', $id)
            ->getQuery()
            ->getSingleResult(Query::HYDRATE_ARRAY);
    }
}