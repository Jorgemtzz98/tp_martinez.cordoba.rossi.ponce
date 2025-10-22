import { Router } from "express"

import {
    find,
    findOne,
    add,
    update,
    remove,
    getTurnosOcupados
} from "./turno.controller.js"

export const turnoRouter = Router()

turnoRouter.get("/ocupados", getTurnosOcupados);
turnoRouter.get('/', find)
turnoRouter.get('/:id', findOne); 
turnoRouter.post('/', add)
turnoRouter.put('/:id', update)
turnoRouter.delete('/:id', remove)