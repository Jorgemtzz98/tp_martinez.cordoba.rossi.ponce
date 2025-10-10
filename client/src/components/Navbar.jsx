import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <h4 className="me-4">Gestión Clínica</h4>
      <div>
        <Link className="btn btn-outline-primary mx-2" to="/pacientes">
          Crear Paciente
        </Link>
        <Link className="btn btn-outline-success mx-2" to="/turnos">
          Crear Turno
        </Link>
        <Link className="btn btn-outline-warning mx-2" to="/profesionales">
          Crear Profesional
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;