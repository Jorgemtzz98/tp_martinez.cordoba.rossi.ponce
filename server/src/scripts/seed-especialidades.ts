import { orm } from '../shared/db/orm.js'
import { Especialidad } from '../especialidad/especialidad.entity.js'

async function seed() {
  const em = orm.em.fork();

  const especialidades = [
    'Clínico',
    'Cardiología',
    'Pediatría',
    'Traumatología',
    'Dermatología',
    'Neurología',
    'Oftalmología',
    'Otorrinolaringología'
  ].map(nombre => em.create(Especialidad, { nombre }));

  em.persist(especialidades);
  await em.flush();

  console.log('✅ Especialidades insertadas');
  await orm.close(true);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

//Este script es para cargar en la BD las especialidades medicas, hay que usar el comando: node dist/scripts/seed-especialidades.js