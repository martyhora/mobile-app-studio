<?php

namespace App\Authentication;

use \Firebase\JWT\JWT;

class JwtAuth
{
    private $key;
    private $algorithm;

    public function __construct($key, $algorithm)
    {
        $this->key = $key;
        $this->algorithm = $algorithm;
    }

    public function createToken(array $user)
    {
        return JWT::encode([
            "user" => $user,
            "iss" => "{$_SERVER['SERVER_PROTOCOL']}{$_SERVER['HTTP_HOST']}",
            "aud" => "{$_SERVER['SERVER_PROTOCOL']}{$_SERVER['HTTP_HOST']}",
            "iat" => time(),
            "nbf" => time(),
        ], $this->key, $this->algorithm);
    }

    private function retrieveTokenFromAuthHeader($authHeader)
    {
        list($jwt) = sscanf($authHeader, 'Bearer %s');

        return $jwt;
    }

    public function getUserData($authHeader)
    {
        try {
            $jwt = $this->retrieveTokenFromAuthHeader($authHeader);

            $jwtData = JWT::decode($jwt, $this->key, [$this->algorithm]);

            return $jwtData->user;
        } catch (\Exception $e) {
            return null;
        }
    }
}