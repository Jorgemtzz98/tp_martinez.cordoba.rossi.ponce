import { Entity, Property, OneToMany, ManyToOne, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"

@Entity()
export class Turno extends BaseEntity {
    @Property({nullable: false})
    fecha!: string
    @Property({nullable: false})
    hora!: string
    @ManyToOne('Paciente')
    paciente!: import('../pacientes/paciente.entity.js').Paciente;  
    @ManyToOne('Profesional')
    profesional!: import('../profesional/profesional.entity.js').Profesional;
}
