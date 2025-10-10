import { Entity, Property, OneToMany, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Paciente } from "../pacientes/paciente.entity.js"

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
}