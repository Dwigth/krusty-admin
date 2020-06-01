-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-06-2020 a las 19:32:52
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tscbit_matilde`
--

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `DeleteProject`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteProject` (IN `id_project` INT(11))  BEGIN
    DELETE FROM invitados_proyecto WHERE id_proyecto = id_project;
	DELETE usuario_tarea FROM usuario_tarea INNER JOIN tareas ON usuario_tarea.id_tarea = tareas.id WHERE tareas.id_proyecto = id_project;
	DELETE FROM tareas WHERE id_proyecto = id_project;
    DELETE FROM proyecto WHERE id = id_project;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id_admin` int(11) NOT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contrasena` varchar(200) DEFAULT NULL,
  `token` varchar(200) DEFAULT NULL,
  `activo` int(11) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `img` text DEFAULT NULL,
  `email` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`id_admin`, `usuario`, `contrasena`, `token`, `activo`, `nombre`, `img`, `email`) VALUES
(2, 'administrador', '$2b$10$1Cc5aJfRo.E4ByAouT8mCeOkGuStpqpsILbsyINsWscHVTOv6jP6O', '0caa2a525198542716bacdfde8f7461b', 0, NULL, NULL, NULL),
(3, 'super_administrador', '$2b$15$0TGG0Enf8fvBdm4cVd4l3ukY4B43n01oQIGuxcloGpipV4EMXv4by', 'e09a951a19e7a303bfed4dbc60c20f85ac2c6b443b508a6b253498e749903144', 1, 'dwigth', '/uploads/37ea9a79dbabb189373f2d9c9b88cab2', 'dwigth32@outlook.es'),
(4, 'super_administrador', '$2b$10$Wjm5YyLZezI3pIrLagwo8u99iR2SglMmXKb3qPS8vQEknqvq6Dmrq', '9ee8cf979ff7cf18157b92f23a4987b2d1776a99927568f14fb1106731187001', 1, 'olivermp', '/uploads/b224effb0cf5f4cf63b84f020f81ca79', NULL),
(5, 'administrador', '$2b$15$LVw8/OQyCRa8qkg282OTzOvMFod6kegtNOeQtIUQHsoHA9e5z78SS', 'b7c70496ef99ae63a458e7cb0f89c4173feadd65941f9cb3f4f1290337400258', 1, 'roberto', '/uploads/c210959d64ec2a47044a07cb550048c6', 'roberto_glez@outlook.com'),
(6, 'administrador', '$2b$10$Wjm5YyLZezI3pIrLagwo8u99iR2SglMmXKb3qPS8vQEknqvq6Dmrq', '0caa2a525198542716bacdfde8f7461b', 1, 'david', '/uploads/73373bfaa05fcca33e0ffcbf76c3c0eb', NULL),
(7, 'administrador', '$2b$15$/PnSvnHiDst5hDbVl7vQIO1I4NY/GSiUGPzvwISq9YR4ErJRlRhmu', 'ccaa7da98a6ae05dba0b71bb811dfa296b8bbb80e9679afd16f0f7e93317178e', 1, 'carlos', '/uploads/bfeb95f1ca4ee1cb6c527785ac801364', 'carlossas_97@hotmail.com'),
(8, 'administrador', '$2b$15$Y91281Kncs7s5WT5A9Kw5.6E44srRkdxbBpYYqOn3u9W9bv4Wu9o6', '0caa2a525198542716bacdfde8f7461b', 0, 'marioe', NULL, 'm_erick_2@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin_profile`
--

DROP TABLE IF EXISTS `admin_profile`;
CREATE TABLE `admin_profile` (
  `id_admin` int(11) DEFAULT NULL,
  `portada_img` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `fb_profile` text DEFAULT NULL,
  `twt_profile` text DEFAULT NULL,
  `number` varchar(15) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(150) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `admin_profile`
--

INSERT INTO `admin_profile` (`id_admin`, `portada_img`, `bio`, `fb_profile`, `twt_profile`, `number`, `nombre`, `apellidos`, `direccion`) VALUES
(2, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '/uploads/b0af30e0b5d7e1a3fe7d982f2d4eca94', 'Ingeniero de TIC', 'facebook.com/profile/dwigth32', '', '', 'Dwigth', 'Astacio Hernández', 'Agapito Dominguez # 36 Col Guayabal'),
(4, '/uploads/31ed33d4017ec39733513dae43b9fcd6', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, '/uploads/ac579e550f1f86b1c83caf0cc85ba89b', 'Soy un ingeniero en tecnologias de la información', '', '', '', 'Roberto', 'Gonzalez Vargas', ''),
(6, '/uploads/a9e93b81612a5ec5317f09297beeda82', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin_recuperacion`
--

DROP TABLE IF EXISTS `admin_recuperacion`;
CREATE TABLE `admin_recuperacion` (
  `id_recuperacion` int(11) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `admin_recuperacion`
--

INSERT INTO `admin_recuperacion` (`id_recuperacion`, `id_admin`) VALUES
(9, 3),
(10, 3),
(11, 5),
(12, 7),
(13, 8),
(14, 8),
(15, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE `cliente` (
  `ID_USUARIO` varchar(50) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`ID_USUARIO`, `nombre`, `apellidos`, `correo`, `contrasena`, `createdAt`, `updatedAt`) VALUES
('4HoADqQJxpPoTef0rA3XCaa1nNt1', 'carla fabiola', 'armas garcia', 'ckrlokc_armas@hotmail.com', '', '2019-04-24 15:11:46', '2019-04-24 15:11:46'),
('4wa8nm4prrTD3PQw3tfRwjBXMc02', 'test', 'test test', 'test3@gmail.com', '', '2019-02-04 03:07:07', '2019-02-04 03:07:07'),
('5XgQJbrqM7fKQR9U014luK5fTuT2', 'Roberto', 'test', 'xiondeath@gmail.com', NULL, '2020-02-22 20:41:43', '2020-02-22 20:41:43'),
('aL3GtIEyKFfkvUxxXfBZbqUwSA43', 'carlos alberto', 'alvarez pascual', 'car.alp@hotmail.com', '', '2019-03-17 02:33:36', '2019-03-17 02:33:36'),
('asdasda', 'ada', 'asdasd', 'adsads', '', '2019-02-04 02:58:02', '2019-02-04 03:06:33'),
('DXOKCE0tAcWMKG1Pq0WxzJozJSF3', 'test2', 'test2', 'test6@gmail.com', '', '2019-02-04 06:50:59', '2019-02-04 06:50:59'),
('FBgnevWONyPgriOq7GQXv5zmL9B2', 'Paola', 'San Luis', 'codesur.vhsa@gmail.com', '', '2019-02-05 17:44:55', '2019-02-05 17:44:55'),
('gfszug6LfPQbHfpvbLVy3Lc0Myp1', 'test', 'test test', 'test4@gmail.com', '', '2019-02-04 03:08:19', '2019-02-04 03:08:19'),
('HutJSr6T0whvRELZl0XHaGOVgiQ2', 'Miles', 'Morales', 'testmatilde2@gmail.com', '', '2019-03-30 17:58:55', '2019-03-30 17:58:55'),
('iI8w4RFRxoP2yeYFgEl6QsGp16a2', 'luis enrique', 'diaz castillo', 'henrydiaz@hotmail.com', '', '2019-02-20 21:24:09', '2019-02-20 21:24:09'),
('JlucGBVQ66YkePKJBWDnGzwmu3D2', 'Roberto', 'Gonzalez', 'roberto_glez@outlook.com', '', '2019-02-04 17:25:39', '2019-02-04 17:25:39'),
('JMd7iHoFX4Zb1cXXoVi2qY8PchY2', 'test', 'test test', 'test5@gmail.com', '', '2019-02-04 05:21:50', '2019-02-04 05:21:50'),
('PxuE1Ji8AuUxgtk4CQXZN14CND42', 'asd', 'asd', 'asd@gmail.com', '', '2019-03-02 21:11:41', '2019-03-02 21:11:41'),
('RRGq6kFfxDVIxiMkjv0BnAKuHZh2', 'Dwigth', 'Astacio Hernández', 'dwigth32@outlook.es', '', '2019-02-04 18:42:04', '2019-02-04 18:42:04'),
('T9bmCGLSUrVvRU7SjMhojFpeBos2', 'sergio manuel', 'morales morales', 'sergiommm3112@gmail.com', '', '2019-02-25 22:22:33', '2019-02-25 22:22:33'),
('yUrQwfxSDHW2DE0d5tElu8WuTzp1', 'Ariana', 'Rosas Albarran', 'rosas.ariana.91@gmail.com', '', '2019-04-08 18:28:25', '2019-04-08 18:28:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_tareas`
--

DROP TABLE IF EXISTS `comentarios_tareas`;
CREATE TABLE `comentarios_tareas` (
  `id_tarea` int(11) DEFAULT NULL,
  `id_comentario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nombreEmpresa` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `usuario` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_registro` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `nombreEmpresa`, `usuario`, `password`, `fecha_registro`, `token`) VALUES
(1, 'nombre actualizado', 'usuario actualizado', '1234', '25/04/2020 14:00', 'alguntoken'),
(3, 'empresa nombre', 'su usuario', 'contrasea', '2020-05-30 01:01', 'tokenaqui'),
(4, 'empresa nombre', 'su usuario', 'contrasea', '2020-05-30 15:49', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta_estimacion_riesgo`
--

DROP TABLE IF EXISTS `encuesta_estimacion_riesgo`;
CREATE TABLE `encuesta_estimacion_riesgo` (
  `id` int(11) NOT NULL,
  `respuestas` varchar(4) DEFAULT NULL,
  `FUM` date DEFAULT NULL,
  `id_usuario` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `invitados_proyecto`
--

DROP TABLE IF EXISTS `invitados_proyecto`;
CREATE TABLE `invitados_proyecto` (
  `id_proyecto` int(11) DEFAULT NULL,
  `id_invitado` int(11) DEFAULT NULL,
  `permisos` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `invitados_proyecto`
--

INSERT INTO `invitados_proyecto` (`id_proyecto`, `id_invitado`, `permisos`) VALUES
(2, 3, NULL),
(2, 8, NULL),
(2, 7, NULL),
(2, 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `krusty_machine`
--

DROP TABLE IF EXISTS `krusty_machine`;
CREATE TABLE `krusty_machine` (
  `id_server` int(11) NOT NULL,
  `ultimaFechaReinicio` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `longitud` double NOT NULL,
  `latitud` double NOT NULL,
  `nombreServer` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ip_server` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ciudad` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `krusty_machine`
--

INSERT INTO `krusty_machine` (`id_server`, `ultimaFechaReinicio`, `activo`, `longitud`, `latitud`, `nombreServer`, `ip_server`, `ciudad`) VALUES
(1, '2020-03-28 12:50', 0, -92.945, 17.9987, 'Asus-Carlos', '187.194.105.216', 'Villahermosa/TAB'),
(2, '2020-03-29 09:25', 0, -92.9004, 18.0163, 'matilde01', '189.128.150.57', 'Villahermosa/TAB');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `licencia`
--

DROP TABLE IF EXISTS `licencia`;
CREATE TABLE `licencia` (
  `ID_LICENCIA` varchar(50) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `key` varchar(10) DEFAULT NULL,
  `ID_USUARIO` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `licencia`
--

INSERT INTO `licencia` (`ID_LICENCIA`, `fecha`, `key`, `ID_USUARIO`, `createdAt`, `updatedAt`) VALUES
('0', NULL, 'unodos', '4wa8nm4prrTD3PQw3tfRwjBXMc02', '2019-02-04 03:07:07', '2019-02-04 03:07:07'),
('1y9QmAjgN2WvqDL2Kb6O', NULL, '0bx3oxvo', '5XgQJbrqM7fKQR9U014luK5fTuT2', '2020-02-22 20:41:43', '2020-02-22 20:41:43'),
('3mPr817ezVvzD496gGla', NULL, 'unosiete', 'RRGq6kFfxDVIxiMkjv0BnAKuHZh2', '2019-02-04 18:42:04', '2019-02-04 18:42:04'),
('5jJBrxzMRBagdyp1Qn8w', NULL, '3qKXkoE9', 'T9bmCGLSUrVvRU7SjMhojFpeBos2', '2019-02-25 22:22:33', '2019-02-25 22:22:33'),
('71BnZDxbzPDzaoXA4kEe', NULL, 'wNYm4qEG', 'FBgnevWONyPgriOq7GQXv5zmL9B2', '2019-02-05 17:44:55', '2019-02-05 17:44:55'),
('9xN7rMalVPN2J5znRL63', NULL, 'unocuatro', 'JMd7iHoFX4Zb1cXXoVi2qY8PchY2', '2019-02-04 05:21:50', '2019-02-04 05:21:50'),
('eAZ4nj3NzpwKL2BQwvdy', NULL, 'AeY8r1OE', 'aL3GtIEyKFfkvUxxXfBZbqUwSA43', '2019-03-17 02:33:37', '2019-03-17 02:33:37'),
('j9Pv24OwlP6g1neNqa3x', NULL, 'unotres', 'gfszug6LfPQbHfpvbLVy3Lc0Myp1', '2019-02-04 03:08:19', '2019-02-04 03:08:19'),
('JbNyALZkOlaRz1MavQ4l', NULL, 'yzWPaa1X', 'iI8w4RFRxoP2yeYFgEl6QsGp16a2', '2019-02-20 21:24:09', '2019-02-20 21:24:09'),
('kNzDx0YV4wvBreq7pd3o', NULL, '50qyvYDG', 'PxuE1Ji8AuUxgtk4CQXZN14CND42', '2019-03-02 21:11:41', '2019-03-02 21:11:41'),
('KPoEJj952K0Wy3pVGRD7', NULL, '9mbElMAE', 'yUrQwfxSDHW2DE0d5tElu8WuTzp1', '2019-04-08 18:28:25', '2019-04-08 18:28:25'),
('owJrjyxklwOl15OWgvqz', NULL, 'mQ8eW9oA', 'HutJSr6T0whvRELZl0XHaGOVgiQ2', '2019-03-30 17:58:55', '2019-03-30 17:58:55'),
('PdojraYyD7JNg3QbERzG', NULL, 'unocinco', 'DXOKCE0tAcWMKG1Pq0WxzJozJSF3', '2019-02-04 06:50:59', '2019-02-04 06:50:59'),
('rZYbdAn5KPV7k0RamEj6', NULL, 'kL14vnav', '4HoADqQJxpPoTef0rA3XCaa1nNt1', '2019-04-24 15:11:46', '2019-04-24 15:11:46'),
('Z81oz4gv5Rv5xG6yYAXO', NULL, 'unoseis', 'JlucGBVQ66YkePKJBWDnGzwmu3D2', '2019-02-04 17:25:39', '2019-02-04 17:25:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metodo`
--

DROP TABLE IF EXISTS `metodo`;
CREATE TABLE `metodo` (
  `id_metodo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `metodo`
--

INSERT INTO `metodo` (`id_metodo`, `nombre`) VALUES
(8, 'Anticonceptivos Orales'),
(9, 'Métodos Inyectables'),
(10, 'Condón Masculino'),
(11, 'Anticonceptivos de Emergencia'),
(13, 'Parches Anticonceptivos'),
(14, 'Pruebas de embarazo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
CREATE TABLE `notificaciones` (
  `id` int(11) NOT NULL,
  `cve_usuario` int(11) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `subtitulo` varchar(255) DEFAULT NULL,
  `mensaje` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `visto` tinyint(1) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fecha_visto` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `fecha_inicio` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `cve_elemento` int(11) DEFAULT NULL,
  `modulo` varchar(255) DEFAULT NULL,
  `tipo` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `principio`
--

DROP TABLE IF EXISTS `principio`;
CREATE TABLE `principio` (
  `id_principio` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `id_metodo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `principio`
--

INSERT INTO `principio` (`id_principio`, `nombre`, `id_metodo`) VALUES
(10, ' Algestona+Estradiol', 9),
(11, 'Medroxiprogesterona+Estradiol', 9),
(12, 'Progesterona+Estradiol', 9),
(13, 'Norelgestromina+Etinilestradiol', 13),
(14, 'Levonorgestrel', 11),
(16, 'Drospirenona+Etinilestradiol', 8),
(17, 'Ciproterona+Estradiol', 8),
(18, 'Desogestrel+Etinilestradiol', 8),
(19, 'Levonorgestrel+Etinilestradiol', 8),
(20, 'Ulipristal', 11),
(21, 'Noretisterona+Estradiol', 9),
(22, 'Gestodeno+Etinilestradiol', 8),
(23, 'Pruebas de embarazo', 14),
(24, 'Condón Masculino', 10),
(25, 'Estradiol', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `precio` varchar(10) DEFAULT NULL,
  `presentacion` text DEFAULT NULL,
  `id_metodo` int(11) DEFAULT NULL,
  `id_principio` int(11) DEFAULT NULL,
  `id_tienda` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `imagen`, `nombre`, `precio`, `presentacion`, `id_metodo`, `id_principio`, `id_tienda`) VALUES
(37, '', 'Mesbru', '41', '1 Ampolleta. Método Mensual', 9, 10, 1),
(38, '', 'Genecar', '49', ' 1 Ampolleta. Método Mensual', 9, 11, 1),
(39, '', 'Gestrygen', '159', ' 1 Ampolleta. Método Mensual', 9, 12, 1),
(40, '', 'Evra', '317', '3 Piezas', 13, 13, 1),
(41, '', 'Levonorgestrel Unidosis', '65', '1 Tableta', 11, 14, 1),
(42, 'C:/AppServ/www/public/productos/42/no-available.png', 'Levonorgestrel', '50', '2 Tabletas', 11, 14, 1),
(44, 'C:/AppServ/www/public/productos/44/no-available.png', 'Drospirenona + Etinilestradiol', '149', '21 Comprimidos', 8, 16, 1),
(45, 'C:/AppServ/www/public/productos/45/no-available.png', 'Ciproterona + Etinilestradiol', '129', '21 Tabletas', 8, 17, 1),
(46, 'C:/AppServ/www/public/productos/46/no-available.png', 'Perrigo', '50', '21 Tabletas', 8, 18, 1),
(47, 'C:/AppServ/www/public/productos/47/no-available.png', 'Perrigo México', '37', '28 Tabletas', 8, 19, 1),
(48, 'C:/AppServ/www/public/productos/48/no-available.png', 'Yasmin', '291', '21 Comprimidos', 8, 16, 2),
(49, '', 'Cyclofemina', '185', '1 Ampolleta. Método Mensual', 9, 11, 2),
(50, '', 'Patector', '209', '1 Ampolleta. Método Mensual', 9, 10, 2),
(51, '', 'Dreams', '95', '2 Tabletas', 11, 14, 2),
(52, '', 'Postday', '84', '2 Tabletas', 11, 14, 2),
(53, '', 'Diane', '323', '21 Grageas', 8, 17, 2),
(54, '', 'Postday', '119', '1 Tableta', 11, 14, 2),
(55, '', 'Yasmin 24/4', '312', '28 Grageas', 8, 16, 2),
(56, '', 'Evra', '352', '3 Piezas', 13, 13, 2),
(57, '', 'Femelle One', '161', '1 Tableta', 11, 20, 2),
(58, '', 'Ilimit', '258', '28 Comprimidos', 8, 16, 2),
(59, '', 'Microgynon', '198', '21 Grageas', 8, 19, 2),
(60, '', 'Nordet', '235', '21 Grageas', 8, 19, 2),
(61, '', 'Ginorelle', '271', '28 Comprimidos', 8, 16, 2),
(63, '', 'Marvelon', '227', '21 Tabletas', 8, 18, 2),
(64, '', 'Minulet', '356', '21 Grageas', 8, 22, 2),
(65, '', 'Mercilon', '280', '21 Tabletas', 8, 18, 2),
(66, '', 'Gynovin', '353', '21 Grageas', 8, 22, 2),
(67, '', 'Radiance', '246', '28 Comprimidos', 8, 16, 2),
(68, '', 'Minesse', '445', '28 Grageas', 8, 22, 2),
(69, '', 'Microgynon', '208', '28 Capsulas', 8, 19, 2),
(70, '', 'Triquilar', '286', '21 Grageas', 8, 19, 2),
(71, '', 'Simi Texturizado', '27', '3 Piezas', 10, 24, 1),
(72, '', 'Alfa Texturizados', '34', '3 Piezas', 10, 24, 1),
(74, '', 'Quickly', '50', '1 Pieza', 14, 23, 1),
(75, '', 'Primogyn', '433', '28 Grageas', 8, 25, 2),
(76, '', 'Neogynon', '304', '21 Grageas', 8, 19, 2),
(77, '', 'Cerciora-T', '112', '2 Comprimidos', 11, 14, 2),
(78, '', 'Postinor-2', '153', '1 Tableta', 11, 14, 2),
(79, '', 'Oportuna', '101', '2 Grageas', 11, 14, 2),
(80, '', 'Sico Sensitive', '57', '3 Piezas', 10, 24, 2),
(81, '', 'Sico Safety', '57', '3 Piezas', 10, 24, 2),
(82, '', 'Trojan Clasico', '53', '3 Piezas', 10, 24, 2),
(83, '', 'Prudence Clasico', '9', '1 Pieza', 10, 24, 2),
(84, '', 'Prudence Clasico', '31', '3 Piezas', 10, 24, 2),
(85, '', 'M Force Natural', '50', '3 Piezas', 10, 24, 2),
(86, '', 'Playboy Clasico', '45', '3 Piezas', 10, 24, 2),
(87, '', 'One Step', '71', '1 Pieza', 14, 23, 2),
(88, '', 'Just Ask', '64', '1 Pieza', 14, 23, 2),
(89, '', 'Gravix', '60', '1 Pieza', 14, 23, 2),
(90, '', 'First Response', '169', '1 Pieza', 14, 23, 2),
(91, '', 'Ahorro Digital', '148', '1 Pieza', 14, 23, 2),
(92, '', 'Clearblue Digital', '198', '1 Pieza', 14, 23, 2),
(93, '', 'Ahorro Casera', '53', '1 Pieza', 14, 23, 2),
(94, '', 'Postinor U.S', '108', '1 Pieza', 14, 23, 2),
(95, '', 'Clearblue Casera', '94', '1 Pieza', 14, 23, 2),
(96, '', 'Prudence Clásico ', '40', '3 Piezas', 10, 24, 3),
(97, '', 'Sico Play', '39', '3 Piezas', 10, 24, 3),
(98, '', 'Prudence Clasico', '37', '3 Piezas', 10, 24, 16),
(99, '', 'Prudence Texturizado', '50', '3 Piezas', 10, 24, 16),
(100, '', 'Trojan Clasico', '65', '3 Piezas', 10, 24, 16),
(101, '', 'Sico Sensitive', '79', '3 Piezas', 10, 24, 16),
(102, '', 'Playboy Clásico', '60', '3 Piezas', 10, 24, 16),
(103, '', 'Trojan Piel Desnuda', '48', '3 Piezas', 10, 24, 17),
(104, '', 'M Texturizados', '55', '3 Piezas', 10, 24, 17),
(105, '', 'Durex Profam', '28', '3 Piezas', 10, 24, 17),
(106, '', 'M Ultra Sens', '55', '3 Piezas', 10, 24, 17),
(107, '', 'Prudence Clásico', '32', '3 Piezas', 10, 24, 17),
(108, '', 'Sico Safety', '56', '3 Piezas', 10, 24, 17),
(109, '', 'Trojan Pro-Tech', '53', '3 Piezas', 10, 24, 17),
(110, '', 'Sico Ultrasense', '55', '3 Piezas', 10, 24, 17),
(111, '', 'Just Ask', '55', '1 Pieza', 14, 23, 17),
(112, '', 'Clearblue Digital', '190', '1 Pieza', 14, 23, 17),
(113, '', 'Medi Mart', '45', '1 Pieza', 14, 23, 17),
(114, '', 'Gravix', '50', '1 Pieza', 14, 23, 17),
(115, '', 'Postday', '115', '1 Comprimido', 11, 14, 17),
(116, '', 'Postday', '79', '2 Comprimidos', 11, 14, 17),
(117, '', 'Postinor', '116', '1 Tableta', 11, 14, 17),
(118, '', 'Oportuna', '118', '2 Tabletas', 11, 14, 17),
(119, '', 'Femelle One', '227', '1 Comprimido', 11, 20, 17),
(120, '', 'Evra', '354', '3 Piezas', 13, 13, 17),
(121, '', 'Clearblue Digital', '188', '1 Pieza', 14, 23, 18),
(122, '', 'Clearblue Casera', '94', '1 Pieza', 14, 23, 18),
(123, '', 'Gravix', '48', '1 Pieza', 14, 23, 18),
(124, '', 'Gi Supramed', '45', '1 Pieza', 14, 23, 18),
(125, '', 'One Step', '50', '1 Pieza', 14, 23, 18),
(126, '', 'Fullsen Seguridad', '71', '3 Piezas', 10, 24, 19),
(127, '', 'Prudence Clasico', '60', '3 Piezas', 10, 24, 19),
(128, '', 'M Force Multi O', '88', '3 Piezas', 10, 24, 19),
(129, '', 'Sico Play', '50', '3 Piezas', 10, 24, 19),
(130, '', 'Trojan Pro Tech', '77', '3 Piezas', 10, 24, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

DROP TABLE IF EXISTS `proyecto`;
CREATE TABLE `proyecto` (
  `id_creador` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_termino` date DEFAULT NULL,
  `vista_actual` varchar(20) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_creador`, `id`, `fecha_inicio`, `fecha_termino`, `vista_actual`, `nombre`) VALUES
(4, 2, '2020-01-01', '2020-06-30', 'month', 'Krusty Machine'),
(3, 3, NULL, NULL, NULL, 'Kareoke');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recuperacion_contra`
--

DROP TABLE IF EXISTS `recuperacion_contra`;
CREATE TABLE `recuperacion_contra` (
  `id` int(11) NOT NULL,
  `fecha_peticion` datetime DEFAULT NULL,
  `fecha_limite` datetime DEFAULT NULL,
  `token_acceso` varchar(200) DEFAULT NULL,
  `activo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `recuperacion_contra`
--

INSERT INTO `recuperacion_contra` (`id`, `fecha_peticion`, `fecha_limite`, `token_acceso`, `activo`) VALUES
(1, '2019-12-07 12:53:58', '2019-12-07 12:58:58', '5baa16ce9b0eaff3183495f5c3f321195f66b82110d89b0a35c4a8e179dcb1d8', 1),
(2, '2019-12-07 12:55:05', '2019-12-07 13:00:05', 'f1d51c5b2920401e1a61a45129390c44953650264c9d340b1c53f25ecf788ff6', 1),
(3, '2019-12-07 12:57:05', '2019-12-07 13:02:05', '8cd8af48c5a21d43dde8e6f443cb701f7089f3af35247f4643fa57c9477e4afd', 1),
(4, '2019-12-07 13:00:20', '2019-12-07 13:05:20', 'f9b9782488078e87c341fb9da13e1852c8ef59e67aca580750a6275079731b51', 1),
(5, '2019-12-07 13:00:33', '2019-12-07 13:05:33', '7d5912df43cd92604617b8b2bf11be781f36760d94798e944e1dd4036a33ddee', 1),
(6, '2019-12-07 13:02:04', '2019-12-07 13:07:04', '57f78c9f03b15075051821e9e987e13ca48f98587a59374db7d30fbbb046728e', 1),
(7, '2019-12-07 13:02:31', '2019-12-07 13:07:31', 'ae35da4a16b28877a0ce9829260e620970c0ed842ae17bece41a550cfcfe4e9a', 1),
(8, '2019-12-07 13:04:08', '2019-12-07 13:09:08', 'f907e6345b359b15ec914f5f36cab5df56ebea8163252d5e12d617b6dd242bdc', 1),
(9, '2019-12-07 13:13:30', '2019-12-07 13:18:30', 'a32179754b471ee06826e413912d25610b7ed842f09e433e3826cb847bfc634d', 1),
(10, '2019-12-07 13:45:33', '2019-12-07 13:50:33', '44f43a1944c1b6b5f1a582afa61f2ae78b6b05f5468b9db25a583f7b9e434314', 0),
(11, '2019-12-07 14:15:15', '2019-12-07 14:20:15', 'd163b7891bdf9ea13bf7d0d98282bb1479e715df419bccc5f6400e15e3d1ff7d', 1),
(12, '2019-12-21 14:55:45', '2019-12-21 15:00:45', 'a402e2b02825b20a698be8f84d29708fc614eab091f848b731fc039a87ee5ca2', 0),
(13, '2019-12-21 15:00:09', '2019-12-21 15:05:09', '33dcfe780554faae06cad112ad8977d921219b25b160966103f4657d6dedd06a', 1),
(14, '2019-12-21 15:03:04', '2019-12-21 15:08:04', '63cfb2a3088927b8dc5dba27ce7f12f627d3e05d1fa1d9781deff54f3332d9a3', 1),
(15, '2019-12-21 15:04:25', '2019-12-21 15:09:25', '1e6bfbd4226a7b8d483fbda9cf9ff371f08316cef585b87eb11b1b036eb079ec', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones`
--

DROP TABLE IF EXISTS `suscripciones`;
CREATE TABLE `suscripciones` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `nombre_servicio` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_vencimiento` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pagado` tinyint(1) NOT NULL,
  `tipo` int(2) NOT NULL,
  `metodo_pago` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `recurrencia` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `suscripciones`
--

INSERT INTO `suscripciones` (`id`, `id_empresa`, `nombre_servicio`, `fecha_inicio`, `fecha_vencimiento`, `pagado`, `tipo`, `metodo_pago`, `recurrencia`) VALUES
(6, 1, 'nombre actualizado', '30-05-2020 12:00', '30-06-2020 12:00', 1, 0, 'EFECTIVO', 'ANUAL'),
(7, 1, 'SITIO WEB Y APP', '29-05-2020 13:00', '29-06-2020 13:00', 1, 1, 'EFECTIVO', 'MENSUAL');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `id_proyecto` int(11) DEFAULT NULL,
  `nombre` varchar(125) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_termino` datetime DEFAULT NULL,
  `progreso` double DEFAULT NULL,
  `dependencia` text DEFAULT NULL,
  `orden` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `id_proyecto`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_termino`, `progreso`, `dependencia`, `orden`) VALUES
(2, 2, 'Proyecto: Krusty Machine', '', '2019-12-30 00:00:00', '2020-06-16 00:00:00', 0, '0', 0),
(3, 2, 'Diseñar mockups', '', '2020-01-01 00:00:00', '2020-01-07 00:00:00', 1, '0', 1),
(4, 2, 'Diseñar las interfaces', '', '2020-01-06 00:00:00', '2020-01-12 00:00:00', 1, '3', 2),
(5, 2, 'Desarrollo de las interfaces', '', '2020-01-01 00:00:00', '2020-01-15 00:00:00', 1, '0', 3),
(6, 2, 'Rediseño de texturas HQ', '', '2020-01-18 00:00:00', '2020-03-28 00:00:00', 0, '', 4),
(7, 2, 'Sistema de visualización ', '', '2020-01-24 00:00:00', '2020-01-31 00:00:00', 0.575, '0', 5),
(8, 2, 'Integrar modelos', '', '2020-02-22 00:00:00', '2020-03-07 00:00:00', 0, '', 6),
(9, 2, 'Postprocesado', '', '2020-03-07 00:00:00', '2020-03-14 00:00:00', 0, '', 7),
(10, 2, 'Testeo', '', '2020-03-14 00:00:00', '2020-03-28 00:00:00', 0, '', 8),
(11, 2, 'Integrar texturas', '', '2020-04-04 00:00:00', '2020-04-11 00:00:00', 0, '6', 9),
(12, 2, 'Cotización, investigación, blueprints, prototipo 3d ', '', '2020-01-04 00:00:00', '2020-02-29 00:00:00', 0, '', 10),
(13, 2, 'Panel para estatus de Krusty Machines', '', '2020-02-28 00:00:00', '2020-03-29 00:00:00', 0, '0', 11),
(14, 2, 'Pantalla multi touch', '', '2020-03-27 00:00:00', '2020-03-28 00:00:00', 1, '5', 12),
(15, 2, 'Estructura de manager escalable', '', '2020-03-28 00:00:00', '2020-03-29 00:00:00', 1, '5', 13),
(16, 2, 'Gestor de ventanas e interfaces', '', '2020-03-28 00:00:00', '2020-03-29 00:00:00', 1, '5', 14),
(17, 2, 'Creación de las interfaces', '', '2020-03-27 00:00:00', '2020-03-28 00:00:00', 1, '5', 15),
(18, 3, 'Kareoke', '', '2020-03-07 09:34:51', '2020-03-25 08:34:44', 0, '0', 0),
(19, 3, 'Desarrollo de la aplicación en IONIC', '', '2020-03-03 00:00:00', '2020-03-24 00:00:00', 0, '18', 5),
(20, 3, 'Diseño de la base de datos', '', '2020-03-24 00:00:00', '2020-03-24 00:00:00', 0, '18', 1),
(21, 3, 'Diseño de flujo de trabajo', '', '2020-03-23 00:00:00', '2020-03-24 00:00:00', 0, '18', 3),
(22, 3, 'Diseño de la aplicación básico', '', '2020-03-24 00:00:00', '2020-03-24 00:00:00', 0, '0', 4),
(23, 3, 'Diseño de la aplicación básico', '', '2020-03-24 00:00:00', '2020-03-24 00:00:00', 0, '0', 2),
(24, 3, 'Deploy a las tiendas (Playstore, Appstore)', '', '2020-03-24 00:00:00', '2020-03-24 00:00:00', 0, '18', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_comentarios`
--

DROP TABLE IF EXISTS `tareas_comentarios`;
CREATE TABLE `tareas_comentarios` (
  `id_comentador` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `comentario` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas_relaciones`
--

DROP TABLE IF EXISTS `tareas_relaciones`;
CREATE TABLE `tareas_relaciones` (
  `id_proyecto` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `source` int(11) DEFAULT NULL,
  `target` int(11) DEFAULT NULL,
  `type` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tareas_relaciones`
--

INSERT INTO `tareas_relaciones` (`id_proyecto`, `id`, `source`, `target`, `type`) VALUES
(2, 1, 2147483647, 2147483647, '0'),
(2, 2, 2147483647, 2147483647, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tienda`
--

DROP TABLE IF EXISTS `tienda`;
CREATE TABLE `tienda` (
  `id_tienda` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `direccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tienda`
--

INSERT INTO `tienda` (`id_tienda`, `nombre`, `direccion`) VALUES
(1, 'Farmacias Similares', '  P. Sherman Calle Walaby 42, Sydney-'),
(2, 'Farmacias del Ahorro', ' Uff man en cada esquina tambien'),
(3, 'OXXO', 'Cada esquina :v'),
(15, 'Farmacias Siglo XXI', 'Esqu'),
(16, 'Farmacias Yza', 'everywhere'),
(17, 'Walmart', 'todoelmundo'),
(18, 'Chedraui', 'everywhere x2'),
(19, 'Extra', 'porelmundo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_tarea`
--

DROP TABLE IF EXISTS `usuario_tarea`;
CREATE TABLE `usuario_tarea` (
  `id` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `id_tarea` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indices de la tabla `admin_profile`
--
ALTER TABLE `admin_profile`
  ADD KEY `id_admin` (`id_admin`);

--
-- Indices de la tabla `admin_recuperacion`
--
ALTER TABLE `admin_recuperacion`
  ADD KEY `PK_recuperacion_id_recuperacion` (`id_recuperacion`),
  ADD KEY `PK_recuperacion_id_admin` (`id_admin`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`ID_USUARIO`);

--
-- Indices de la tabla `comentarios_tareas`
--
ALTER TABLE `comentarios_tareas`
  ADD KEY `PK_comentario_id_tarea` (`id_tarea`),
  ADD KEY `PK_comentario_id_comentario` (`id_comentario`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `encuesta_estimacion_riesgo`
--
ALTER TABLE `encuesta_estimacion_riesgo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PK_encuesta_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `invitados_proyecto`
--
ALTER TABLE `invitados_proyecto`
  ADD KEY `PK_invitado_proyecto` (`id_proyecto`),
  ADD KEY `PK_invitado_id` (`id_invitado`);

--
-- Indices de la tabla `krusty_machine`
--
ALTER TABLE `krusty_machine`
  ADD PRIMARY KEY (`id_server`);

--
-- Indices de la tabla `licencia`
--
ALTER TABLE `licencia`
  ADD PRIMARY KEY (`ID_LICENCIA`),
  ADD KEY `PK_licencia_id_usuario` (`ID_USUARIO`);

--
-- Indices de la tabla `metodo`
--
ALTER TABLE `metodo`
  ADD PRIMARY KEY (`id_metodo`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cve_usuario` (`cve_usuario`);

--
-- Indices de la tabla `principio`
--
ALTER TABLE `principio`
  ADD PRIMARY KEY (`id_principio`),
  ADD KEY `PK_principio_metodo` (`id_metodo`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `PK_producto_metodo` (`id_metodo`),
  ADD KEY `PK_producto_principio` (`id_principio`),
  ADD KEY `PK_producto_tienda` (`id_tienda`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PK_proyecto_creador` (`id_creador`);

--
-- Indices de la tabla `recuperacion_contra`
--
ALTER TABLE `recuperacion_contra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PK_tarea_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `tareas_comentarios`
--
ALTER TABLE `tareas_comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PK_comentador` (`id_comentador`);

--
-- Indices de la tabla `tareas_relaciones`
--
ALTER TABLE `tareas_relaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PK_tarea_relaciones_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `tienda`
--
ALTER TABLE `tienda`
  ADD PRIMARY KEY (`id_tienda`);

--
-- Indices de la tabla `usuario_tarea`
--
ALTER TABLE `usuario_tarea`
  ADD PRIMARY KEY (`id`),
  ADD KEY `PK_usuario_tarea_admin` (`id_admin`),
  ADD KEY `PK_usuario_tarea_tarea` (`id_tarea`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `krusty_machine`
--
ALTER TABLE `krusty_machine`
  MODIFY `id_server` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `metodo`
--
ALTER TABLE `metodo`
  MODIFY `id_metodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `principio`
--
ALTER TABLE `principio`
  MODIFY `id_principio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `recuperacion_contra`
--
ALTER TABLE `recuperacion_contra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `tareas_comentarios`
--
ALTER TABLE `tareas_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tareas_relaciones`
--
ALTER TABLE `tareas_relaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tienda`
--
ALTER TABLE `tienda`
  MODIFY `id_tienda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `usuario_tarea`
--
ALTER TABLE `usuario_tarea`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin_profile`
--
ALTER TABLE `admin_profile`
  ADD CONSTRAINT `admin_profile_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`);

--
-- Filtros para la tabla `admin_recuperacion`
--
ALTER TABLE `admin_recuperacion`
  ADD CONSTRAINT `admin_recuperacion_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`),
  ADD CONSTRAINT `admin_recuperacion_ibfk_2` FOREIGN KEY (`id_recuperacion`) REFERENCES `recuperacion_contra` (`id`);

--
-- Filtros para la tabla `comentarios_tareas`
--
ALTER TABLE `comentarios_tareas`
  ADD CONSTRAINT `comentarios_tareas_ibfk_1` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`);

--
-- Filtros para la tabla `encuesta_estimacion_riesgo`
--
ALTER TABLE `encuesta_estimacion_riesgo`
  ADD CONSTRAINT `eer_cliente` FOREIGN KEY (`id_usuario`) REFERENCES `cliente` (`ID_USUARIO`);

--
-- Filtros para la tabla `invitados_proyecto`
--
ALTER TABLE `invitados_proyecto`
  ADD CONSTRAINT `invitados_proyecto_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`),
  ADD CONSTRAINT `invitados_proyecto_ibfk_2` FOREIGN KEY (`id_invitado`) REFERENCES `admin` (`id_admin`);

--
-- Filtros para la tabla `licencia`
--
ALTER TABLE `licencia`
  ADD CONSTRAINT `licencia_cliente` FOREIGN KEY (`ID_USUARIO`) REFERENCES `cliente` (`ID_USUARIO`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_tienda`) REFERENCES `tienda` (`id_tienda`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_principio`) REFERENCES `principio` (`id_principio`),
  ADD CONSTRAINT `producto_ibfk_3` FOREIGN KEY (`id_metodo`) REFERENCES `metodo` (`id_metodo`);

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `proyecto_ibfk_1` FOREIGN KEY (`id_creador`) REFERENCES `admin` (`id_admin`);

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`);

--
-- Filtros para la tabla `tareas_comentarios`
--
ALTER TABLE `tareas_comentarios`
  ADD CONSTRAINT `tareas_comentarios_ibfk_1` FOREIGN KEY (`id`) REFERENCES `comentarios_tareas` (`id_comentario`),
  ADD CONSTRAINT `tareas_comentarios_ibfk_2` FOREIGN KEY (`id_comentador`) REFERENCES `admin` (`id_admin`);

--
-- Filtros para la tabla `tareas_relaciones`
--
ALTER TABLE `tareas_relaciones`
  ADD CONSTRAINT `tareas_relaciones_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id`);

--
-- Filtros para la tabla `usuario_tarea`
--
ALTER TABLE `usuario_tarea`
  ADD CONSTRAINT `usuario_tarea_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin` (`id_admin`),
  ADD CONSTRAINT `usuario_tarea_ibfk_2` FOREIGN KEY (`id_tarea`) REFERENCES `tareas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
