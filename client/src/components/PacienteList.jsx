import { useState } from "react";
import Axios from "axios";

function PacienteList() {
  const [pacientes, setPacientes] = useState([]);

  const getPacientes = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/pacientes");
      setPacientes(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Error al listar pacientes");
    }
  };

  return (
    <div className="card p-3">
      <h4>Lista de Pacientes</h4>
      <button className="btn btn-primary mb-3" onClick={getPacientes}>
        Listar Pacientes
      </button>
      {pacientes.map((p, i) => (
        <div key={i} className="border rounded p-2 mb-2">
          <div><strong>Nombre:</strong> {p.nombre}</div>
          <div><strong>Apellido:</strong> {p.apellido}</div>
          <div><strong>DNI:</strong> {p.dni}</div>
          <div><strong>Email:</strong> {p.email}</div>
          <div><strong>Teléfono:</strong> {p.telefono}</div>
        </div>
      ))}
    </div>
  );
}

export default PacienteList;