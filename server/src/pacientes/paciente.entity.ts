import { Entity, Property, OneToMany, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Turno } from "../turno/turno.entity.js"

@Entity()
export class Paciente extends BaseEntity {
    @Property({nullable: false})
    nombre!: string
    @Property({nullable: false})
    apellido!: string
    @Property({nullable: false})
    dni!: string
    @Property({nullable: false}) 
    email!: string
    @Property({nullable: false}) 
    telefono!: string
    @ManyToMany (() => Turno, (turno) => turno.pacientes,{
        mappedBy:'turnos'
    })
    turnos = new Collection<Turno>(this)
}