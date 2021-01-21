const express = require('express') //Exportamos la libreria
const app = express() //Funcion que nos entrega el entorno de la app donde él va a trabajar(instancia)
const morgan = require('morgan')
const actores = require('./routes/actores')
require('dotenv').config()//Confgurar el archvo.env

app.use(morgan('dev'))
//Nos acepta la transmicion de objetos json del cliente(postman)
app.use(express.json())
//Routes
app.use('/api', actores) //Se empiezan a cargar a la app esas rutas, se recbe el enrrutador (router)

app.get('/', (req, res) => {
    res.send("<h1>API Academia</h1>")
}) //Llamamos a la instancia, luego al método, ruta,fucion flecha con los parametros


app.get('/estudiantes', (req, res) => {
    let estudiantes = []
    estudiantes.push({nombre: 'pepito',apellido : 'perez', edad : 20})
    res.json(estudiantes)
})

app.set('port',process.env.PORT || 5000);
/*Se crea un nombre de una varables que esta en el archvo env o que elja el puerto 5000  
Estamos tomando varables de confguarcon que están en el acrhvo .env
O me tomas la del acrhvo .env o el puerto 5000*/

app.listen(app.get('port'), () => {
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}!!`)
})//Se levanta el servidor para que escuche peticiones a través de http y nos entregué alguna respuesta
//El listen recibe dos parametros (puerto y respuesta de conexión exitosa)
