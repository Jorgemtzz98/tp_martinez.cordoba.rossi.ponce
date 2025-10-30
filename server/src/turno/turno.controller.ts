import {Request, Response} from 'express'
import { orm } from '../shared/db/orm.js'
import { Turno } from './turno.entity.js'
import { Paciente } from "../pacientes/paciente.entity.js";
import { Profesional } from "../profesional/profesional.entity.js";

const em = orm.em

async function add(req:Request, res:Response) {
    const em = orm.em.fork();
    const { fecha, hora, profesionalId, pacienteDni } = req.body;
    try {
        const pacienteconst = await em.findOne(Paciente, { dni: pacienteDni });
        if (!pacienteconst) {
            return res.status(404).json({ message: "Paciente no encontrado" });
        }

        const profesional = await em.findOne(Profesional, { id: profesionalId });
        if (!profesional) {
            return res.status(404).json({ message: "Profesional no encontrado" });
        }

        const turnoExistente = await em.findOne(Turno, {    
            fecha,
            hora,
            profesional,
        });

        if (turnoExistente) {
        return res.status(400).json({
            message: "Ya existe un turno asignado a este profesional en ese horario.",
        });
        }

        const turno = em.create(Turno, {
            fecha,
            hora,
            profesional,
            paciente: pacienteconst,
        });


        await em.persistAndFlush(turno);

        res.status(201).json({
            message: "Turno creado con éxito",
            data: turno,
        });
    } catch (error: any) {
        console.error("Error al crear turno:", error);
        res.status(500).json({ message: error.message });
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

async function find(req:Request, res:Response) {
    try{
        const turnos = await em.find(Turno, {},{
            populate: ['paciente', 'profesional'],
        })
        res.status(200).json({message: 'Todos los turnos encontrados:', data: turnos})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
    
}

async function update(req: Request, res:Response) {
    try{
        const id = Number.parseInt(req.params.id) 
        const turno = em.getReference(Turno, id)
        const { fecha, hora, profesionalId } = req.body
        em.assign(turno, { fecha, hora })
        if (profesionalId) {
        turno.profesional = em.getReference(Profesional, Number(profesionalId))
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
        const turno = em.getReference(Turno, id)
        await em.removeAndFlush(turno)
        res.status(200).json({ message: "Turno eliminado correctamente" });
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }

}

async function getTurnosOcupados(req: Request, res: Response) {
  const em = orm.em.fork();
  const { profesionalId, fecha } = req.query;
  try {
    if (!profesionalId || !fecha) {
      return res.status(400).json({ message: "Faltan parámetros" });
    }
    const profesionalIdNum = Number(profesionalId);
    const turnos = await em.find(Turno, {
      profesional: profesionalIdNum,
      fecha: fecha as string,
    });
    const horasOcupadas = turnos.map((t) => t.hora);
    res.status(200).json(horasOcupadas);
  } catch (error: any) {
    console.error("Error obteniendo turnos ocupados:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

export { find, add, update, remove, findOne, getTurnosOcupados}

