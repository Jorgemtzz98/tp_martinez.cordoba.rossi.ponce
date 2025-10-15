import { Router } from "express"

import {
    find,
} from "./especialidad.controller.js"

export const especialidadRouter = Router()

especialidadRouter.get('/', find)