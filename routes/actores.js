const { Router } = require('express') //Se trae por destructuring en objeto Router de express (enrutador)
const router = Router()
const { cnn_mysql } = require('../config/database') //Se trae objeto de conexión por destructuring, ya se tene la conexion a la BD


router.get('/actor', (req, res) => {
    cnn_mysql.query(`SELECT * FROM actores`, (error, resulset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send('Se presento un error en la base de datos.')
        } else {
            return res.json(resulset)
        }
    })
})
router.get('/actor/:id', (req, res) => {

})
router.post('/actor', (req, res) => {

})
router.put('/actor/:id', (req, res) => {

})
router.patch('/actor/:id', (req, res) => {

})
router.patch('/delete/:id', (req, res) => {

})

module.exports = router; //(enrutador)



