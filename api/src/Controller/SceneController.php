<?php

namespace App\Controller;

use App\Entity\Application;
use App\Entity\Scene;
use App\Repository\SceneRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SceneController extends Controller
{
    /**
     * @Route("/api/v1/scenes/{id}", name="api.scenes.list")
     * @Method("GET")
     */
    public function index(Application $application, SceneRepository $sceneRepository)
    {
        $scenes = $sceneRepository->findScenesByApplication($application);

        return new JsonResponse($scenes);
    }

    /**
     * @Route("/api/v1/scenes/scenes-to-application/{id}", name="api.scenes.scenes_to_application")
     * @Method("GET")
     */
    public function scenesToApplication(Scene $scene, SceneRepository $sceneRepository)
    {
        $scenes = $sceneRepository->findScenesByScene($scene);

        return new JsonResponse($scenes);
    }

    /**
     * @Route("/api/v1/scene/{id}", name="api.scenes.detail")
     * @Method("GET")
     */
    public function detail(int $id, SceneRepository $sceneRepository)
    {
        $scene = $sceneRepository->findById($id);

        return new JsonResponse($scene);
    }

    /**
     * @Route("/api/v1/scenes", name="api.scenes.add")
     * @Method("POST")
     */
    public function add(Request $request, SceneRepository $sceneRepository)
    {
        $data = json_decode($request->getContent(), true);

        $sceneRepository->addScene($data);

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/api/v1/scenes/{id}", name="api.scenes.update")
     * @Method("PUT")
     */
    public function update(Request $request, SceneRepository $sceneRepository, Scene $scene)
    {
        $data = json_decode($request->getContent(), true);

        $sceneRepository->updateScene($data, $scene);

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/api/v1/scenes/{id}", name="api.scenes.delete")
     * @Method("DELETE")
     */
    public function delete(SceneRepository $sceneRepository, Scene $scene)
    {
        $sceneRepository->deleteScene($scene);

        return new JsonResponse(['success' => true]);
    }
}
