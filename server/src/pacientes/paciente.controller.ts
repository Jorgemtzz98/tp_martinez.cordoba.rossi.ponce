import {Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Paciente } from './paciente.entity.js'
import { ObraSocial} from '../obraSocial/obraSocial.entity.js'


const em = orm.em

async function find(req:Request, res:Response) {
    try{    
        const pacientes = await em.find(Paciente, {}, {populate: ['obrasocial']})
        res.status(200).json({message: 'Todos los pacientes encontrados:', data: pacientes})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
    
}

async function findOne(req:Request, res:Response) {
    try{
        const id = Number.parseInt(req.params.id)
        const paciente = await em.findOneOrFail(Paciente, {id}, {populate: ["obrasocial"],})
        res.status(200).json({message: 'Paciente encontrado:', data: paciente})
    } catch (error: any) {        
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res:Response) {
    try{
        const paciente = em.create(Paciente, req.body)
        await em.flush()
        res.status(201).json({message: 'Paciente creado con éxito', data: paciente})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response) {
    try{
    const id = Number.parseInt(req.params.id) 
    const paciente = em.getReference(Paciente, id)
    const { nombre, apellido, dni, email, telefono, obraSocialId } = req.body
    em.assign(paciente, { nombre, apellido, dni, email, telefono  })
    if (obraSocialId) {
        paciente.obrasocial = em.getReference(ObraSocial, Number(obraSocialId))
    }
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
        const paciente = em.getReference(Paciente, id,)
        await em.removeAndFlush(paciente)
        res.status(200).json({ message: "Paciente eliminado correctamente" });
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }

}

export { find, add, update, remove, findOne}









