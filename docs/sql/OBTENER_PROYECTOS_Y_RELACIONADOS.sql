-- Obtener todos los proyectos de un usuario
 SELECT p.*
 FROM proyecto p
 WHERE p.id_creador = 2;

-- Obtener todos los proyectos en los que estás relacionados
SELECT DISTINCT ut.id_admin,p.id AS id_proyecto
FROM usuario_tarea ut
INNER JOIN tareas t
ON ut.id_tarea = t.id
INNER JOIN proyecto p
ON t.id_proyecto = p.id
WHERE ut.id_admin = 2