const { Router } = require('express') //Se trae por destructuring en objeto Router de express (enrutador)
const router = Router()
const { cnn_mysql } = require('../config/database') //Se trae objeto de conexión por destructuring, ya se tene la conexion a la BD

//Se emplea una petcon con una promesa y utllzando un callbac
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

//Asing aweit con una promesa,funcion asincrona(async) porque se utliza el await
//Para utilizarlo necesitariamos llamar  
router.get('/actor/:id', async (req, res) => {
    const id = req.params.id
    /*Hacemos un destructuring que es lo que trae la consulta([rows]) y le pasamos una consulta
    precombinada y un arreglo que corresponda a cada uno de los elentos que vamos a agregar ahí*/
    const [rows] = await cnn_mysql.promise().query(`SELECT * FROM actores WHERE id = ?`, [id])
    //const [rows] = await cnn_mysql.promise().query(`SELECT * FROM actores WHERE id = ${id}`)
    if (rows[0]) {
        res.json(rows[0])
    } else {
        res.json({})
    }
})
router.post('/actor', async (req, res) => {
    /*Si aparece alguna excepción o error el se va directamebte 
    por el catch y se pueda hacer una captura del error*/
    try {
        //Se trae el body por destructuring, se evita estar llamandolas una por una. 
        const {
            documento,
            tipo_documento,
            nombres,
            apellidos,
            contrasena,
            correo,
            telefono_celular,
            numero_expediente,
            genero,
            fecha_nacimiento,
            estado_actor_id,
            institucion_id,
            tipo_actor_id,
            fecha_creacion,
            fecha_actualizacion
        } = req.body
        //Hacemos un destructuring que es lo que trae la consulta([rows])
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO actores(documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id, fecha_creacion,fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [documento, tipo_documento, nombres, apellidos, contrasena, correo, telefono_celular, numero_expediente, genero, fecha_nacimiento, estado_actor_id, institucion_id, tipo_actor_id, fecha_creacion, fecha_actualizacion])
        console.log(rows);
        //rows.affectedRows son las columnas alteradas y con esta funcion la muestra
        if (rows.affectedRows > 0) {
            res.json({
                id: rows.insertId,
                documento: documento,
                tipo_documento: tipo_documento,
                nombres: nombres,
                apellidos: apellidos,
                contrasena: contrasena,
                correo: correo,
                telefono_celular: telefono_celular,
                numero_expediente: numero_expediente,
                genero: genero,
                fecha_nacimiento: fecha_nacimiento,
                estado_actor_id: estado_actor_id,
                institucion_id: institucion_id,
                tipo_actor_id: tipo_actor_id,
                fecha_creacion: fecha_creacion,
                fecha_actualizacion: fecha_actualizacion
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ errorCode: e.errno, message: "Error en el servidor" })
    }

})
router.put('/actor/:id', (req, res) => {

})
router.patch('/actor/:id', async(req, res) => {
    try {
        if (Object.keys(req.body).length > 0) {
            const id = req.params.id
            let SQL = 'UPDATE actores SET '
            const params = []

            for (const elment in req.body) {
                SQL += `${elment} = ?, `
                params.push(req.body[elment])
            }
            SQL = SQL.slice(0, -2)
            SQL += ` WHERE id = ?`
            params.push(id)
           // console.log(SQL, params)
            let [rows] = await cnn_mysql.promise().execute(SQL, params)
            
            if (rows.affectedRows > 0) {
                [rows] = await cnn_mysql.promise().query(`SELECT * FROM actores WHERE id = ?`, [id])
                res.json(rows[0])
            }else{
                res.json({})
            }
        } else {
            res.status(401).json({ message: 'No existe campos a modificar' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ errorCode: e.errno, message: "Error en el servidor" })
    }
})
router.patch('/delete/:id', (req, res) => {

})

module.exports = router; //(enrutador)



