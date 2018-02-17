<?php

namespace App\Repository;

use App\Entity\Application;
use Slim\App;
use Symfony\Bridge\Doctrine\RegistryInterface;

class ApplicationRepository extends BaseRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Application::class);
    }

    public function findApplications(): array
    {
        return $this
            ->createQueryBuilder('a')
            ->getQuery()
            ->getArrayResult();
    }

    public function addApplication(array $data): void
    {
        $application = new Application();
        $application->setTitle($data['title']);
        $application->setApiBase($data['apiBase']);

        $this->getEntityManager()->persist($application);
        $this->getEntityManager()->flush();
    }

    public function updateApplication(array $data, Application $application): void
    {
        $application->setTitle($data['title']);
        $application->setApiBase($data['apiBase']);
        $application->setMenuItems($data['menuItems']);

        $this->getEntityManager()->merge($application);
        $this->getEntityManager()->flush();
    }

    public function deleteApplication(Application $application): void
    {
        $this->getEntityManager()->remove($application);
        $this->getEntityManager()->flush();
    }
}
