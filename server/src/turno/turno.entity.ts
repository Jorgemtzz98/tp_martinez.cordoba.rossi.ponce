import { Entity, Property, OneToMany, ManyToOne, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Paciente } from "../pacientes/paciente.entity.js"
import { Profesional } from "../profesional/profesional.entity.js"


@Entity()
export class Turno extends BaseEntity {
    @Property({nullable: false})
    fecha!: string
    @Property({nullable: false})
    hora!: string
    @ManyToMany(() => Paciente, (paciente) => paciente.turnos,{
        cascade: [Cascade.ALL],
        owner:true,
    } ) 
    pacientes = new Collection<Paciente>(this)    
    @ManyToOne(() => Profesional)
    profesional!: Profesional;
}
