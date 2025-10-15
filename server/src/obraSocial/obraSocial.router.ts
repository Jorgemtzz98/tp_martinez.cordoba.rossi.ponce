import { Router } from "express"

import {
    find,
    add,
    remove,
} from "./obraSocial.controller.js"

export const obraSocialRouter = Router()

obraSocialRouter.get('/', find)
obraSocialRouter.post('/', add)
obraSocialRouter.delete('/:id', remove)