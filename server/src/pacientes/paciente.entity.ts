import { Entity, Property, OneToMany, ManyToOne, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Turno } from "../turno/turno.entity.js"
import { ObraSocial} from "../obraSocial/obraSocial.entity.js"

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
    @OneToMany (() => Turno, (turno) => turno.paciente)
    turnos = new Collection<Turno>(this)
    @ManyToOne(() => ObraSocial)
    obrasocial!: ObraSocial;
}