<?php

use App\Authentication\JwtAuth;
use App\Creator\ApplicationCreator;
use App\DbModel\ApplicationModel;
use App\DbModel\SceneModel;
use App\DbModel\SectionModel;
use App\DbModel\UserModel;
use Medoo\Medoo;
use Psr\Http\Message\ResponseInterface;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface;

require 'vendor/autoload.php';

if (!class_exists('App\Creator\ApplicationCreator')) {
    header('Content-Type: application/json');

    echo json_encode(['error' => "Implementation of ApplicationCreator class must be provided. You can create a default implementation by copying ApplicationCreator.example.php file, renaming it to ApplicationCreator.php and renaming class in it to ApplicationCreator."]);

    exit;
}

require 'config.php';

$app = new \Slim\App;
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

$jwtAuth = new JwtAuth($config['jwt']['key'], $config['jwt']['algorithm']);

$app->add(function (ServerRequestInterface $request, ResponseInterface $response, $next) use ($jwtAuth) {
    if ($request->getUri()->getPath() !== 'auth') {
        $user = $jwtAuth->getUserData($request->getHeader('Authorization')[0]);

        if (!$user) {
            return $response->withJson(['success' => false, 'authorizationFailed' => true]);
        }
    }

    $response = $next($request, $response);

    return $response;
});


$sceneModel = new SceneModel(new Medoo($config['db']));
$sectionModel = new SectionModel(new Medoo($config['db']));
$applicationModel = new ApplicationModel(new Medoo($config['db']));
$userModel = new UserModel(new Medoo($config['db']));
$applicationCreator = new ApplicationCreator($config);

$app->get('/scenes/{applicationId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    return $response->withJson($sceneModel->fetchScenesByApplicationId($args['applicationId']));
});

$app->get('/scene/{sceneId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    return $response->withJson($sceneModel->fetchById($args['sceneId']));
});

$app->get('/scenes/scenes-to-appliacation/{sceneId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    return $response->withJson($sceneModel->fetchScenesToApplicationBySceneId($args['sceneId']));
});

$app->post('/scenes', function (Request $request, Response $response) use ($app, $sceneModel) {
    $data = $request->getParsedBody();

    $errors = $sceneModel->saveForm($data);

    if (count($errors) > 0) {
        return $response->withJson(['success' => false, 'errors' => $errors]);
    }

    return $response->withJson(['success' => true]);
});

$app->put('/scenes/{sceneId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    $data = $request->getParsedBody();

    $errors = $sceneModel->saveForm($data, $args['sceneId']);

    if (count($errors) > 0) {
        return $response->withJson(['success' => false, 'errors' => $errors]);
    }

    return $response->withJson(['success' => true]);
});

$app->delete('/scenes/{sceneId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    $sceneModel->delete(['id' => $args['sceneId']]);

    return $response->withJson(['success' => true]);
});

$app->get('/applications/create/{applicationId}', function (Request $request, Response $response, $args) use ($applicationModel, $applicationCreator) {
    $applicationFilename = $applicationCreator->createApplication($args['applicationId']);

    $response = $response->withHeader('Content-Description', 'File Transfer')
        ->withHeader('Content-Type', 'application/octet-stream')
        ->withHeader('Content-Disposition', 'attachment;filename="' . basename($applicationFilename) . '"')
        ->withHeader('Expires', '0')
        ->withHeader('Cache-Control', 'must-revalidate')
        ->withHeader('Pragma', 'public')
        ->withHeader('Content-Length', filesize($applicationFilename));

    readfile($applicationFilename);

    unlink($applicationFilename);

    return $response;
});

$app->get('/applications', function (Request $request, Response $response) use ($applicationModel) {
    return $response->withJson($applicationModel->fetchAll());
});

$app->get('/applications/{applicationId}', function (Request $request, Response $response, $args) use ($applicationModel) {
    return $response->withJson($applicationModel->fetchById($args['applicationId']));
});

$app->post('/applications', function (Request $request, Response $response) use ($app, $applicationModel) {
    $data = $request->getParsedBody();

    unset($data['id']);

    $errors = $applicationModel->saveForm($data);

    if (count($errors) > 0) {
        return $response->withJson(['success' => false, 'errors' => $errors]);
    }

    return $response->withJson(['success' => true]);
});

$app->put('/applications/{applicationId}', function (Request $request, Response $response, $args) use ($applicationModel) {
    $data = $request->getParsedBody();

    $errors = $applicationModel->saveForm($data, $args['applicationId']);

    if (count($errors) > 0) {
        return $response->withJson(['success' => false, 'errors' => $errors]);
    }

    return $response->withJson(['success' => true]);
});

$app->delete('/applications/{applicationId}', function (Request $request, Response $response, $args) use ($applicationModel) {
    $applicationModel->delete(['id' => $args['applicationId']]);

    return $response->withJson(['success' => true]);
});


$app->get('/sections/{sceneId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    return $response->withJson($sceneModel->fetchSectionsBySceneId($args['sceneId']));
});

$app->put('/sections/{sceneId}', function (Request $request, Response $response, $args) use ($app, $sceneModel) {
    $data = $request->getParsedBody();

    $sceneModel->updateById(['sections' => json_encode($data)], $args['sceneId']);

    return $response->withJson(['success' => true]);
});

$app->post('/auth', function (Request $request, Response $response) use ($app, $userModel, $jwtAuth) {
    $data = $request->getParsedBody();

    $user = $userModel->fetchUserByCredentials($data['username'], $data['password']);

    if (!$user) {
        return $response->withJson(['success' => false]);
    }

    unset($user['password']);

    return $response->withJson(['success' => true, 'authToken' => $jwtAuth->createToken($user), 'user' => $user]);
});

$app->get('/user', function (Request $request, Response $response) use ($app, $userModel, $jwtAuth) {
    $user = $userModel->fetchById($jwtAuth->getUserData($request->getHeader('Authorization')[0])->id);

    if (!$user) {
        return $response->withJson(['success' => false]);
    }

    unset($user['password']);

    return $response->withJson(['success' => true, 'user' => $user]);
});

$app->run();
