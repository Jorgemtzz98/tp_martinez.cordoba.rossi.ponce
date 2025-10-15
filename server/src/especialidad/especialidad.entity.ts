import { Entity, Property, OneToMany, ManyToMany, Collection, Cascade, } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Profesional } from '../profesional/profesional.entity.js'

@Entity()
export class Especialidad extends BaseEntity {
    @Property({nullable: false})
    nombre!: string;
    @ManyToMany (() => Profesional, (profesional) => profesional.especialidades,{
        mappedBy: 'profesionales' 
    })
    profesionales = new Collection <Profesional>(this);
}