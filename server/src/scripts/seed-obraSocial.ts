import { orm } from '../shared/db/orm.js'
import { ObraSocial } from '../obraSocial/obraSocial.entity.js'

async function seed() {
  const em = orm.em.fork();

  const obrasSociales = [
    'Pami',
    'Federada Salud',
    'Alianza medica',
    'Previnca',
    'Osde',
    'Osceara',
    'Iapos',
  ].map(nombre => em.create(ObraSocial, { nombre }));

  em.persist(obrasSociales);
  await em.flush();

  console.log('✅ Obras Sociales insertadas');
  await orm.close(true);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

//Este script es para cargar en la BD las Obras Sociales, hay que usar el comando: node dist/scripts/seed-obraSocial.js