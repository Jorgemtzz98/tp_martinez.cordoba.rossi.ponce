import {Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Turno } from './turno.entity.js'

const em = orm.em

async function find(req:Request, res:Response) {
    try{
        const turnos = await em.find(Turno, {})
        res.status(200).json({message: 'Todos los turnos encontrados:', data: turnos})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
    
}

async function findOne(req:Request, res:Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const turno = await em.findOneOrFail(Turno, {id})
        res.status(200).json({message: 'Turno encontrado:', data: turno})
    } catch (error: any) {        
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res:Response) {
    try{
        const turno = em.create(Turno, req.body)
        await em.flush()
        res.status(201).json({message: 'Turno creado con éxito', data: turno})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response) {
    try{
    const id = Number.parseInt(req.params.id) 
    const turno = em.getReference(Turno, id)
    em.assign(turno, req.body)
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
        const turno = em.getReference(Turno, id)
        await em.removeAndFlush(turno)
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }

}

export { find, add, update, remove, findOne}

