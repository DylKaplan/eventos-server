import express from 'express'
import Router from './router/router.js'

import config from './config.js'
import CnxMongoDB from './model/DBMongo.js'
import cors from 'cors';

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ----------------------------------
//     ApiRestful: eventos
// ----------------------------------
app.use('/api', new Router().start())


//-----------------------------------
//    Listen del servidor http
//-----------------------------------

await CnxMongoDB.conectar()


const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor ApiRestful escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
