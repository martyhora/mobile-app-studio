<?php

use Creator\ApplicationCreator;
use DbModel\ApplicationModel;
use DbModel\SceneModel;
use DbModel\SectionModel;
use Medoo\Medoo;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

if (!class_exists('Creator\ApplicationCreator')) {
    header('Content-Type: application/json');

    echo json_encode(['error' => "Implementation of ApplicationCreator class must be provided. You can create a default implementation by copying ApplicationCreator.example.php file, renaming it to ApplicationCreator.php and renaming class in it to ApplicationCreator."]);

    exit;
}

require 'config.php';

$app = new \Slim\App;

$sceneModel = new SceneModel(new Medoo($config['db']));
$sectionModel = new SectionModel(new Medoo($config['db']));
$applicationModel = new ApplicationModel(new Medoo($config['db']));
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

    $sceneModel->insert($data);

    return $response->withJson(['success' => true]);
});

$app->put('/scenes/{sceneId}', function (Request $request, Response $response, $args) use ($sceneModel) {
    $data = $request->getParsedBody();

    $sceneModel->updateById($data, $args['sceneId']);

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

    $applicationModel->insert($data);

    return $response->withJson(['success' => true]);
});

$app->put('/applications/{applicationId}', function (Request $request, Response $response, $args) use ($applicationModel) {
    $data = $request->getParsedBody();

    $applicationModel->updateById($data, $args['applicationId']);

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

$app->run();
