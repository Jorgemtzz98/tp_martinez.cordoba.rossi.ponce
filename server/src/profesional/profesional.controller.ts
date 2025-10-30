import {Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Profesional } from './profesional.entity.js'
import { Especialidad } from '../especialidad/especialidad.entity.js'

const em = orm.em

async function find(req:Request, res:Response) {
    try{
        const profesionales = await em.find(Profesional, {},{
            populate: ['especialidades']
    })
        res.status(200).json({message: 'Todos los profesionales encontrados:', data: profesionales})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function findOne(req:Request, res:Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const profesional = await em.findOneOrFail(Profesional, {id},)
        res.status(200).json({message: 'Profesional encontrado:', data: profesional})
    } catch (error: any) {        
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res:Response) {
    try{
        const profesional = em.create(Profesional, req.body)
        await em.flush()
        res.status(201).json({message: 'Profesional creado con éxito', data: profesional})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response) {
    try{
    const id = Number.parseInt(req.params.id) 
    const profesional = em.getReference(Profesional, id)
    em.assign(profesional, req.body)
    await em.flush()
    res.status(200).json({message: 'Modificación completada'})
    } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
}
}

async function remove(req: Request, res:Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const profesional = em.getReference(Profesional, id)
        await em.removeAndFlush(profesional)
        res.status(200).json({ message: "Profesional eliminado correctamente" });
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }

}

export { find, add, update, remove, findOne}

