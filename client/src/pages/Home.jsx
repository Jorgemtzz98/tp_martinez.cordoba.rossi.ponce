import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow">
        <h1 className="mb-3 text-success">Sanatorio Central</h1>
        <p className="lead mb-4">
          Bienvenido a nuestro sistema de gestión del Sanatorio Central.  
          Aquí podrá registrar pacientes, consultar turnos y acceder a información médica de manera rápida y segura.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-3 mb-3">
            <Link to="/pacientes" className="btn btn-success w-100">
              Gestionar Pacientes
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/turnos" className="btn btn-outline-success w-100">
              Ver Turnos
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/contacto" className="btn btn-outline-secondary w-100">
              Contacto
            </Link>
          </div>
        </div>

        <div className="mt-5">
          <h4>Horario de Atención</h4>
          <p>Lunes a Viernes: 8:00 a 20:00 hs</p>
          <p>Sábados: 8:00 a 13:00 hs</p>
        </div>
      </div>
    </div>
  );
}

export default Home;