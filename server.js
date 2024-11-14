import express from 'express'
import RouterEventos from './router/eventos.js'

import config from './config.js'
import CnxMongoDB from './model/DBMongo.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ----------------------------------
//     ApiRestful: eventos
// ----------------------------------
app.use('/api', new RouterEventos().start())


//-----------------------------------
//    Listen del servidor http
//-----------------------------------

await CnxMongoDB.conectar()


const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
