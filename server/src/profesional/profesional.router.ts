import { Router } from "express"

import {
    find,
    findOne,
    add,
    update,
    remove,
} from "./profesional.controller.js"

export const profesionalRouter = Router()

profesionalRouter.get('/', find)
profesionalRouter.get('/:id', findOne); 
profesionalRouter.post('/', add)
profesionalRouter.put('/:id', update)
profesionalRouter.delete('/:id', remove)