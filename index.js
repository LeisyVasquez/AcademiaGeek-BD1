const express = require('express') //Exportamos la libreria
const app = express() //Funcion que nos entrega el entorno de la app donde él va a trabajar(instancia)
const morgan = require('morgan')

app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send("<h1>API Academia</h1>")
}) //Llamamos a la instancia, luego al método, ruta,fucion flecha con los parametros


app.get('/estudiantes', (req, res) => {
    let estudiantes = []
    estudiantes.push({nombre: 'pepito',apellido : 'perez', edad : 20})
    res.json(estudiantes)
})


app.listen(5000, () => {
    console.log("App corriendo en el puerto 8083")
})//Se levanta el servidor para que escuche peticiones a través de http y nos entregué alguna respuesta
//El lsten recibe dos parametros (puerto y respuesta de conexión exitosa)

