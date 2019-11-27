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

CREATE TABLE `proyecto` (
  `id_creador` int,
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `fecha_inicio` date,
  `fecha_termino` date,
  `vista_actual` varchar(20),
  `nombre` varchar(50)
);

CREATE TABLE `invitados_proyecto` (
  `id_proyecto` int,
  `id_invitado` int,
  `permisos` varchar(255)
);

CREATE TABLE `tareas` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_proyecto` int,
  `nombre` varchar(125),
  `descripcion` text,
  `fecha_inicio` datetime,
  `fecha_termino` datetime,
  `progreso` int,
  `dependencia` text,
  `orden` int
);

CREATE TABLE `comentarios_tareas` (
  `id_tarea` int,
  `id_comentario` int
);

CREATE TABLE `tareas_comentarios` (
  `id_comentador` int,
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comentario` text
);

CREATE TABLE `usuario_tarea` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_admin` int,
  `id_tarea` int
);

ALTER TABLE `licencia` ADD CONSTRAINT `licencia_cliente` FOREIGN KEY (`id_usuario`) REFERENCES `cliente` (`id`);

ALTER TABLE `encuesta_estimacion_riesgo` ADD CONSTRAINT `eer_cliente` FOREIGN KEY (`id_usuario`) REFERENCES `cliente` (`id`);

ALTER TABLE `producto` ADD FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id`);

ALTER TABLE `principio` ADD FOREIGN KEY (`id`) REFERENCES `producto` (`id_principio`);

ALTER TABLE `metodo` ADD FOREIGN KEY (`id`) REFERENCES `producto` (`id_metodo`);

ALTER TABLE `admin_profile` ADD FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `admin_recuperacion` ADD FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `admin_recuperacion` ADD FOREIGN KEY (`id_recuperacion`) REFERENCES `recuperacion_contra` (`id`);

ALTER TABLE `proyecto` ADD FOREIGN KEY (`id_creador`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `invitados_proyecto` ADD FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`);

ALTER TABLE `comentarios_tareas` ADD FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`);

ALTER TABLE `tareas_comentarios` ADD FOREIGN KEY (`id`) REFERENCES `comentarios_tareas` (`id_comentario`);

ALTER TABLE `invitados_proyecto` ADD FOREIGN KEY (`id_invitado`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `tareas_comentarios` ADD FOREIGN KEY (`id_comentador`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `tareas` ADD FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`);

ALTER TABLE `usuario_tarea` ADD FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

ALTER TABLE `usuario_tarea` ADD FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`);
