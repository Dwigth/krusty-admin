CREATE TABLE `cliente` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50),
  `apellidos` varchar(100),
  `correo` varchar(100),
  `contrasena` varchar(100)
);

CREATE TABLE `licencia` (
  `id` int PRIMARY KEY,
  `key` varchar(10),
  `id_usuario` int
);

CREATE TABLE `encuesta_estimacion_riesgo` (
  `id` int PRIMARY KEY,
  `respuestas` varchar(4),
  `FUM` date,
  `id_usuario` int
);

CREATE TABLE `admin` (
  `id_admin` int PRIMARY KEY AUTO_INCREMENT,
  `token` varchar(200),
  `activo` int,
  `nombre` varchar(45),
  `img` text,
  `email` text
);

CREATE TABLE `producto` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `imagen` varchar(100),
  `nombre` varchar(45),
  `precio` varchar(10),
  `presentacion` text,
  `id_metodo` int,
  `id_principio` int,
  `id_tienda` int
);

CREATE TABLE `tienda` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(45),
  `direccion` text
);

CREATE TABLE `principio` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(45),
  `id_metodo` int
);

CREATE TABLE `metodo` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(45)
);

CREATE TABLE `admin_profile` (
  `id_admin` int,
  `portada_img` text,
  `bio` text,
  `fb_profile` text,
  `twt_profile` text,
  `number` varchar(15),
  `nombre` varchar(50),
  `apellidos` varchar(150),
  `direccion` varchar(250)
);

CREATE TABLE `admin_recuperacion` (
  `id_recuperacion` int,
  `id_admin` int
);

CREATE TABLE `recuperacion_contra` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fecha_peticion` datetime,
  `fecha_limite` datetime,
  `token_acceso` varchar(200),
  `activo` int
);

ALTER TABLE `licencia` ADD CONSTRAINT `licencia_cliente` FOREIGN KEY (`id_usuario`) REFERENCES `cliente` (`id`);

ALTER TABLE `encuesta_estimacion_riesgo` ADD CONSTRAINT `eer_cliente` FOREIGN KEY (`id_usuario`) REFERENCES `cliente` (`id`);

ALTER TABLE `producto` ADD FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id`);

ALTER TABLE `principio` ADD FOREIGN KEY (`id`) REFERENCES `producto` (`id_principio`);

ALTER TABLE `metodo` ADD FOREIGN KEY (`id`) REFERENCES `producto` (`id_metodo`);

ALTER TABLE `admin_profile` ADD FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `admin_recuperacion` ADD FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `admin_recuperacion` ADD FOREIGN KEY (`id_recuperacion`) REFERENCES `recuperacion_contra` (`id`);
