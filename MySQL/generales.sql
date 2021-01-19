-- Comando de conexión a tráves de consola:  mysql -h localhost -u root 
SHOW DATABASES; -- Visualizar las bases de datos en mysql.
SHOW TABLES; -- Visualizar las tablas en la bases de datos.
USE BD1; --Indica a que BD se quiere reedireccionar
FLUSH PRIVILEGES; --Es para poder tener los privilegios hacer comandos de CREATE USER... 
SELECT user, password FROM user; -- Consultar los usuarios de la BD (Debe de estar en la BD de config mysql)
CREATE USER Leisy@localhost IDENTIFIED BY 'valentina'; --"Crear usuarios"
--Comando de conexión con el usuario a tráves de consola: mysql -u Leisy -p 
GRANT ALL PRIVILEGES ON *.* TO Leisy@localhost; --Se otorgan permisos de superusuario(privilegios sobre todas las BD)
-- || GRANT ALL PRIVILEGES ON *.* TO Leisy@%; "%" significa que se puede conectar desde coalquier host
GRANT ALL PRIVILEGES ON BD1.* TO Leisy@localhost;  --Se otorgan privilegios totales para la base de datos BD1

DROP DATABASE IF EXISTS BD1; --Eliminar BD
CREATE DATABASE BD1; --Crear BD
SHOW DATABASES; --Ver BD
DESC --Descripcion  de la tabla
