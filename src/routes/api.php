<?php

$method = $_SERVER['REQUEST_METHOD'];

$path = parse_url(
    $_SERVER['REQUEST_URI'],
    PHP_URL_PATH
);


// Ruta Productos

if ($path === '/api/products' && $method === 'GET') {
    $controller->index();
    exit;
}

if ($path === '/api/products/register' && $method === 'POST') {
    $controller->store();
    exit;
}

if (preg_match('#^/api/products/([1-9][0-9]*)$#', $path, $matches)) {

    $id = (int) $matches[1];

    if ($method === 'GET') {
        $controller->show($id);
        exit;
    }

    if ($method === 'PUT') {
        $controller->update($id);
        exit;
    }

    if ($method === 'DELETE') {
        $controller->destroy($id);
        exit;
    }
}

// Ruta usuarios

if ($path === '/api/users' && $method === 'GET') {
    $userController->index();
    exit;
}

if ($path === '/api/users/register' && $method === 'POST') {
    $userController->store();
    exit;
}

if (preg_match('#^/api/users/([1-9][0-9]*)$#', $path, $matches)) {

    $id = (int) $matches[1];

    if ($method === 'GET') {
        $userController->show($id);
        exit;
    }

    if ($method === 'PUT') {
        $userController->update($id);
        exit;
    }

    if ($method === 'DELETE') {
        $userController->destroy($id);
        exit;
    }
}


http_response_code(404);

echo json_encode([
    'error' => 'Endpoint no encontrado'
]);
