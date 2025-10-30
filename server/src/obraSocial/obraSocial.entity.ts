import { Entity, Property, OneToMany, ManyToMany, Collection, Cascade, } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Paciente } from "../pacientes/paciente.entity.js"
import { Profesional } from "../profesional/profesional.entity.js"

@Entity()
export class ObraSocial extends BaseEntity {
    @Property({nullable: false})
    nombre!: string;
    @OneToMany(() => Paciente, (paciente) => paciente.obrasocial)
    pacientes = new Collection<Paciente>(this);
    @ManyToMany (() => Profesional, (profesional) => profesional.obrasocial,{
        mappedBy: 'profesionales'
    })
    profesionales = new Collection <Paciente> (this);    
}