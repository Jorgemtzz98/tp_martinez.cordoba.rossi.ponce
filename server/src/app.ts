import express from 'express'
import 'reflect-metadata'
import {pacienteRouter} from './pacientes/paciente.router.js'
import {profesionalRouter} from './profesional/profesional.router.js'
import {turnoRouter} from './turno/turno.router.js'
import {especialidadRouter} from './especialidad/especialidad.router.js'
import {orm, syncSchema} from './shared/db/orm.js' 
import { RequestContext } from '@mikro-orm/core'    
import cors from 'cors'

const app = express()

app.use(cors({ origin: "http://localhost:3000" })); // o tu puerto del front
app.use(express.json()) 

app.use((req, res, next) =>{
    RequestContext.create(orm.em, next)
})

app.use('/api/pacientes', pacienteRouter)
app.use('/api/profesionales', profesionalRouter)
app.use('/api/turnos', turnoRouter)
app.use('/api/especialidades', especialidadRouter)

app.use((_, res) =>{
    return res.status(404).send({message: 'Resource not found'})
})

await syncSchema()

app.listen(3001, () =>{
    console.log("corriendo en el puerto 3001")
})