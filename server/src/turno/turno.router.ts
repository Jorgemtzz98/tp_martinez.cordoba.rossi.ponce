import { Router } from "express"

import {
    find,
    findOne,
    add,
    update,
    remove,
} from "./turno.controller.js"

export const turnoRouter = Router()

turnoRouter.get('/', find)
turnoRouter.get('/:id', findOne); 
turnoRouter.post('/', add)
turnoRouter.put('/:id', update)
turnoRouter.delete('/:id', remove)