import { Entity, Property, OneToMany, ManyToMany, Collection, Cascade } from "@mikro-orm/core";
import { BaseEntity } from "../shared/db/baseEntity.entity.js"
import { Especialidad } from "../especialidad/especialidad.entity.js";
import { ObraSocial} from "../obraSocial/obraSocial.entity.js"
import { Turno } from "../turno/turno.entity.js";

@Entity()
export class Profesional extends BaseEntity {
    @Property({nullable: false})
    nombre!: string
    @Property({nullable: false})
    apellido!: string
    @Property({nullable: false})
    matricula!: string   
    @ManyToMany(() => Especialidad, (especialidad) => especialidad.profesionales, { owner: true })
    especialidades = new Collection<Especialidad>(this);
    @ManyToMany (() => ObraSocial, (obrasocial) => obrasocial.profesionales,{
    owner: true
    })
    obrasocial = new Collection<ObraSocial>(this);
    @OneToMany(() => Turno, (turno) => turno.profesional)
    turnos = new Collection<Turno>(this);
}