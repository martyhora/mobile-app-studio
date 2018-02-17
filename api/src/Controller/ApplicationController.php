<?php

namespace App\Controller;

use App\AppCreator\IAppCreator;
use App\Entity\Application;
use App\Repository\ApplicationRepository;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class ApplicationController extends Controller
{
    private $appCreator;

    public function __construct(IAppCreator $appCreator)
    {
        $this->appCreator = $appCreator;
    }

    /**
     * @Route("/api/v1/applications", name="api.applications.list")
     * @Method("GET")
     */
    public function index(ApplicationRepository $applicationRepository)
    {
        $applications = $applicationRepository->findApplications();

        return new JsonResponse($applications);
    }

    /**
     * @Route("/api/v1/applications/{id}", name="api.applications.detail")
     * @Method("GET")
     */
    public function detail(int $id, ApplicationRepository $applicationRepository)
    {
        $application = $applicationRepository->findById($id);

        return new JsonResponse($application);
    }

    /**
     * @Route("/api/v1/applications", name="api.applications.add")
     * @Method("POST")
     */
    public function add(Request $request, ApplicationRepository $applicationRepository)
    {
        $data = json_decode($request->getContent(), true);

        $applicationRepository->addApplication($data);

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/api/v1/applications/{id}", name="api.applications.update")
     * @Method("PUT")
     */
    public function update(Request $request, ApplicationRepository $applicationRepository, Application $application)
    {
        $data = json_decode($request->getContent(), true);

        $applicationRepository->updateApplication($data, $application);

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/api/v1/applications/{id}", name="api.applications.delete")
     * @Method("DELETE")
     */
    public function delete(ApplicationRepository $applicationRepository, Application $application)
    {
        $applicationRepository->deleteApplication($application);

        return new JsonResponse(['success' => true]);
    }

    /**
     * @Route("/api/v1/applications/create/{id}", name="api.applications.create")
     * @Method("GET")
     */
    public function create(int $id)
    {
        $applicationFilename = $this->appCreator->createApplication($id);

        $response = new BinaryFileResponse($applicationFilename);

        $response->headers->set('Content-Type', 'text/plain');
        $response->setContentDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            basename($applicationFilename)
        );

        return $response;
    }
}
