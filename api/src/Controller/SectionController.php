<?php

namespace App\Controller;

use App\Entity\Scene;
use App\Repository\SceneRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SectionController extends Controller
{
    /**
     * @Route("/api/v1/sections/{id}", name="api.sections.list")
     * @Method("GET")
     */
    public function index(Scene $scene)
    {
        return new JsonResponse($scene->getSections());
    }

    /**
     * @Route("/api/v1/sections/{id}", name="api.sections.update")
     * @Method("PUT")
     */
    public function update(Request $request, Scene $scene, SceneRepository $sceneRepository)
    {
        $data = $request->getContent();

        $sceneRepository->updateScene(['sections' => json_decode($data)], $scene);

        return new JsonResponse(['success' => true]);
    }
}
