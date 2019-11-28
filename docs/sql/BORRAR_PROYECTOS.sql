DELETE FROM invitados_proyecto WHERE id_proyecto = {id};
DELETE usuario_tarea FROM usuario_tarea INNER JOIN tareas ON usuario_tarea.id_tarea = tareas.id WHERE tareas.id_proyecto = {id};
DELETE FROM tareas WHERE id_proyecto = {id};
DELETE FROM proyecto WHERE id = {id};

-- Procedimiento almacenado con parametro
DELIMITER //
 
CREATE PROCEDURE DeleteProject(
    IN id_project int(11)
)
BEGIN
    DELETE FROM invitados_proyecto WHERE id_proyecto = id_project;
	DELETE usuario_tarea FROM usuario_tarea INNER JOIN tareas ON usuario_tarea.id_tarea = tareas.id WHERE tareas.id_proyecto = id_project;
	DELETE FROM tareas WHERE id_proyecto = id_project;
    DELETE FROM proyecto WHERE id = id_project;
END //
 
DELIMITER ;

-- Ejemplo de uso DeleteProject(10)