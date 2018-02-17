<?php

namespace App\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthController extends Controller
{
    /**
     * @Route("/api/login", name="api.auth.login")
     */
    public function index()
    {
    }

    /**
     * @Route("/api/v1/user", name="api.auth.user")
     */
    public function user(UserInterface $user)
    {
        if (!$user->getId()) {
            return new JsonResponse(['success' => false]);
        }

        return new JsonResponse([
            'success' => true,
            'payload' => [
                'user' => $user->toArray(),
            ]
        ]);
    }
}
