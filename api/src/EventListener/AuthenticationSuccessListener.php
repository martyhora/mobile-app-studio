<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
    public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
    {
        $user = $event->getUser();

        $event->setData([
            'success' => true,
            'payload' => [
                'user' => $user->toArray(),
                'authToken' => $event->getData()['token'],
            ],
        ]);
    }
}