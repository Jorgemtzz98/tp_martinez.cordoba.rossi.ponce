import crypto from 'node:crypto'

export class Paciente {
    constructor(
        public nombre: string, 
        public apellido: string, 
        public dni: string, 
        public email: string, 
        public telefono: string
    ){}


}