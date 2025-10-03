import express from 'express'
import 'reflect-metadata'
import {pacientesRouter} from './pacientes/paciente.router.js'
import { paciente } from './paciente.js'
import {orm, syncSchema} from './shared/db/orm.js' 
import { RequestContext } from '@mikro-orm/core'

const app = express()
app.use(express.json()) 

app.use((req, res, next) =>{
    RequestContext.create(orm.em, next)
})

app.use('/api/pacientes', pacientesRouter)

app.use((_, res) =>{
    return res.status(404).send({message: 'Resource not found'})
})

await syncSchema()

app.listen(3001, () =>{
    console.log("corriendo en el puerto 3001")
})