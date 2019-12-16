SELECT ADM.id_admin,
ADM.usuario,
ADM.email,
ADM.img,
ADM.nombre
FROM admin ADM
WHERE ADM.id_admin != 2 AND activo = 1