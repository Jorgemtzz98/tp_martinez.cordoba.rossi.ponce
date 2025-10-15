import {Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import {Especialidad } from './especialidad.entity.js'

const em = orm.em

async function find(req:Request, res:Response) {
    try{
        const especialidades = await em.find(Especialidad, {})
        res.status(200).json({message: 'Todos los pacientes encontrados:', data: especialidades})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
    
}

export {find}