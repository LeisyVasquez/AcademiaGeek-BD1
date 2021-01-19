USE BD1;
DROP TABLE IF EXISTS tipo_documento;
CREATE TABLE tipo_documento(
    codigo VARCHAR(3) PRIMARY KEY, 
    descripcion VARCHAR(100) NOT NULL
);