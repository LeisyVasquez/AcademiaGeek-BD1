USE BD1;
DROP TABLE IF EXISTS actores;
DROP TABLE IF EXISTS tipo_documento;
DROP TABLE IF EXISTS tipo_actores;
DROP TABLE IF EXISTS estado_actores;
DROP TABLE IF EXISTS modulos;

CREATE TABLE tipo_documento(
    codigo VARCHAR(3) PRIMARY KEY, 
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE tipo_actores(
    id INT(5) UNSIGNED AUTO_INCREMENT,
    perfil VARCHAR(100),
    PRIMARY KEY(id)
);
CREATE TABLE estado_actores(
    id INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(30)
) ENGINE=INNODB;

CREATE TABLE modulos(
    id INT(5),
    modulo VARCHAR(10),
    mo VARCHAR(10)
) ENGINE=INNODB;

ALTER TABLE modulos
ADD PRIMARY KEY(id); 

ALTER TABLE modulos
DROP COLUMN mo;

ALTER TABLE modulos
ADD COLUMN `mod` VARCHAR(10);

CREATE TABLE actores(
    id INT(5) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    documento VARCHAR(20) NOT NULL UNIQUE,
    tipo_documento VARCHAR(3) NOT NULL,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255),
    contrasena VARCHAR(100) NOT NULL,
    correo VARCHAR(255) NOT NULL DEFAULT 'correo@dominio.com',
    telefono_celular VARCHAR(30) COMMENT 'Teléfono celular del estuiante',
    numero_expediente VARCHAR(255) NOT NULL UNIQUE,
    genero ENUM('hombre', 'mujer') NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    estado_actor_id INT(5) UNSIGNED,
    institucion_id INT(5),
    tipo_actor_id INT(5) UNSIGNED,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    
    FOREIGN KEY (tipo_actor_id) REFERENCES tipo_actores(id)
) ENGINE=INNODB;

ALTER TABLE actores 
ADD CONSTRAINT `fk_estado_actor` 
FOREIGN KEY (`estado_actor_id`) 
REFERENCES `estado_actores` (`id`)
    ON DELETE RESTRICT 
    ON UPDATE RESTRICT;

INSERT INTO tipo_actores VALUES(1,'Alumno');
INSERT INTO tipo_actores(perfil) VALUES('Docente');
INSERT INTO tipo_actores(perfil) VALUES ('Cordinador'), ('Rector');

UPDATE tipo_actores SET perfil = 'Estudiante' WHERE id IN (1,2,3);

DELETE FROM tipo_actores WHERE id = 1;
TRUNCATE tipo_actores;
DELETE FROM tipo_actores;

SELECT * FROM tipo_actores; 
SELECT perfil, id, NOW() FROM tipo_actores; 