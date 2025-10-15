import {Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import {ObraSocial } from './obraSocial.entity.js'

const em = orm.em

async function find(req:Request, res:Response) {
    try{
        const obrasSociales = await em.find(ObraSocial, {})
        res.status(200).json({message: 'Todos los pacientes encontrados:', data: obrasSociales})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
    
}

async function add(req: Request, res:Response) {
    try{
        const obraSocial = em.create(ObraSocial, req.body)
        await em.flush()
        res.status(201).json({message: 'Obra Social creada con éxito', data: obraSocial})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const obraSocial = em.getReference(ObraSocial, id)
        await em.removeAndFlush(obraSocial)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {find, add, remove}