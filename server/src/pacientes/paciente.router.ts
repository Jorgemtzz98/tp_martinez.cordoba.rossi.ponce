import { Router } from "express"

import {
    find,
    findOne,
    add,
    update,
    remove,
} from "./paciente.controller.js"

export const pacienteRouter = Router()

pacienteRouter.get('/', find)
pacienteRouter.get('/:id', findOne); 
pacienteRouter.post('/', add)
pacienteRouter.put('/:id', update)
pacienteRouter.delete('/:id', remove)