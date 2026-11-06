# PA3-Programaci-n-Web

PA3 - Programación Web - ISIL

1.- Iniciar en terminal en visual studio code (Ampps) -> php -S localhost:8000 -t public

2.- Acceder desde el navegador a localhost/PA3-Programaci-n-Web

3.- Cargar la Base de Datos incluida con el nombre bdisildemo.sql. NOTA: Si se tiene otra bd con ese nombre se va a eliminar.

/// --- OPCIONAL EN CASO DESEE CREARLO MANUALMENTE --- \\\
CREATE DATABASE IF NOT EXISTS `bdisildemo` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bdisildemo`;

CREATE TABLE `usuario` (
`id` int NOT NULL,
`nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
`contrasena` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
`fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
`correo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

4.- Se accede directamente al index.html y desde ahi se puede realizar el listado, registro, busqueda por ID, y eliminación de usuarios

5.- Ejemplo de usuario: nombre ->Kenjo, contraseña -> 123 , correo -> kenjo@kenjo.com
