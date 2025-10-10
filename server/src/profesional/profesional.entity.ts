import { Entity, Property, OneToMany, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"

@Entity()
export class Profesional extends BaseEntity {
    @Property({nullable: false})
    nombre!: string
    @Property({nullable: false})
    apellido!: string
    @Property({nullable: false})
    matricula!: string   
}