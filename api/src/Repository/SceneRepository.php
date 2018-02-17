<?php

namespace App\Repository;

use App\Entity\Application;
use App\Entity\Scene;
use Symfony\Bridge\Doctrine\RegistryInterface;

class SceneRepository extends BaseRepository
{
    private $applicationRepository;

    public function __construct(RegistryInterface $registry, ApplicationRepository $applicationRepository)
    {
        parent::__construct($registry, Scene::class);
        $this->applicationRepository = $applicationRepository;
    }

    public function findScenesByApplication(Application $application)
    {
        return $this->createQueryBuilder('s')
            ->where('s.application = :value')->setParameter('value', $application)
            ->orderBy('s.id', 'DESC')
            ->getQuery()
            ->getArrayResult();
    }

    public function findScenesByScene(Scene $scene)
    {
        return $this->findScenesByApplication($scene->getApplication());
    }

    public function addScene(array $data): void
    {
        $scene = new Scene();
        $scene->setTitle($data['title']);

        $application = $this->applicationRepository->find($data['applicationId']);

        $scene->setApplication($application);

        $this->getEntityManager()->persist($scene);
        $this->getEntityManager()->flush();
    }

    public function updateScene(array $data, Scene $scene): void
    {
        if (isset($data['title'])) {
            $scene->setTitle($data['title']);
        }

        if (isset($data['sections'])) {
            $scene->setSections($data['sections']);
        }

        $this->getEntityManager()->merge($scene);
        $this->getEntityManager()->flush();
    }

    public function deleteScene(Scene $scene): void
    {
        $this->getEntityManager()->remove($scene);
        $this->getEntityManager()->flush();
    }
}
