CREATE TABLE `cliente` (
  `ID_USUARIO` varchar(50) PRIMARY KEY,
  `nombre` varchar(50),
  `apellidos` varchar(100),
  `correo` varchar(100),
  `contrasena` varchar(100),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `licencia` (
  `ID_LICENCIA` varchar(50) PRIMARY KEY,
  `fecha` datetime,
  `key` varchar(10),
  `ID_USUARIO` varchar(50),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `encuesta_estimacion_riesgo` (
  `id` int PRIMARY KEY,
  `respuestas` varchar(4),
  `FUM` date,
  `id_usuario` varchar(50)
);

CREATE TABLE `admin` (
  `id_admin` int PRIMARY KEY AUTO_INCREMENT,
  `usuario` varchar(50),
  `contrasena` varchar(200),
  `token` varchar(200),
  `activo` int,
  `nombre` varchar(45),
  `img` text,
  `email` text
);

CREATE TABLE `producto` (
  `id_producto` int PRIMARY KEY AUTO_INCREMENT,
  `imagen` varchar(100),
  `nombre` varchar(45),
  `precio` varchar(10),
  `presentacion` text,
  `id_metodo` int,
  `id_principio` int,
  `id_tienda` int
);

CREATE TABLE `tienda` (
  `id_tienda` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(45),
  `direccion` text
);

CREATE TABLE `principio` (
  `id_principio` int PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(45),
  `id_metodo` int
);

CREATE TABLE `metodo` (
  `id_metodo` int PRIMARY KEY AUTO_INCREMENT,
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

CREATE TABLE `tareas_relaciones` (
  `id_proyecto` int,
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `source` int,
  `target` int,
  `type` char
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

CREATE INDEX `PK_licencia_id_usuario` ON `licencia` (`ID_USUARIO`);

CREATE INDEX `PK_encuesta_id_usuario` ON `encuesta_estimacion_riesgo` (`id_usuario`);

CREATE INDEX `PK_producto_metodo` ON `producto` (`id_metodo`);

CREATE INDEX `PK_producto_principio` ON `producto` (`id_principio`);

CREATE INDEX `PK_producto_tienda` ON `producto` (`id_tienda`);

CREATE INDEX `PK_principio_metodo` ON `principio` (`id_metodo`);

CREATE INDEX `PK_recuperacion_id_recuperacion` ON `admin_recuperacion` (`id_recuperacion`);

CREATE INDEX `PK_recuperacion_id_admin` ON `admin_recuperacion` (`id_admin`);

CREATE INDEX `PK_proyecto_creador` ON `proyecto` (`id_creador`);

CREATE INDEX `PK_invitado_proyecto` ON `invitados_proyecto` (`id_proyecto`);

CREATE INDEX `PK_invitado_id` ON `invitados_proyecto` (`id_invitado`);

CREATE INDEX `PK_tarea_proyecto` ON `tareas` (`id_proyecto`);

CREATE INDEX `PK_tarea_relaciones_proyecto` ON `tareas_relaciones` (`id_proyecto`);

CREATE INDEX `PK_comentario_id_tarea` ON `comentarios_tareas` (`id_tarea`);

CREATE INDEX `PK_comentario_id_comentario` ON `comentarios_tareas` (`id_comentario`);

CREATE INDEX `PK_comentador` ON `tareas_comentarios` (`id_comentador`);

CREATE INDEX `PK_usuario_tarea_admin` ON `usuario_tarea` (`id_admin`);

CREATE INDEX `PK_usuario_tarea_tarea` ON `usuario_tarea` (`id_tarea`);

ALTER TABLE `licencia` ADD CONSTRAINT `licencia_cliente` FOREIGN KEY (`ID_USUARIO`) REFERENCES `cliente` (`ID_USUARIO`);

ALTER TABLE `encuesta_estimacion_riesgo` ADD CONSTRAINT `eer_cliente` FOREIGN KEY (`id_usuario`) REFERENCES `cliente` (`ID_USUARIO`);

ALTER TABLE `producto` ADD FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id_tienda`);

ALTER TABLE `producto` ADD FOREIGN KEY (`id_principio`) REFERENCES `principio` (`id_principio`);

ALTER TABLE `producto` ADD FOREIGN KEY (`id_metodo`) REFERENCES `metodo` (`id_metodo`);

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

ALTER TABLE `tareas_relaciones` ADD FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`);

