import { useState } from "react";
import Axios from "axios";

function PacienteForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const add = async () => {
    try {
      await Axios.post("http://localhost:3001/api/pacientes", {
        nombre,
        apellido,
        dni,
        email,
        telefono,
      });
      alert("Paciente registrado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al registrar el paciente");
    }
  };

  return (
    <div className="card p-3 mb-3">
      <h4>Registrar Paciente</h4>
      <div className="row g-2">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Apellido"
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="DNI"
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Teléfono"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-success mt-3" onClick={add}>
        Registrar
      </button>
    </div>
  );
}

export default PacienteForm;