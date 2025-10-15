import { useState } from "react";
import Axios from "axios";

function ProfesionalList() {
  const [profesionales, setProfesionales] = useState([]);

  const getProfesionales = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/profesionales");
      setProfesionales(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Error al listar profesionales");
    }
  };

  return (
    <div className="card p-3">
      <h4>Lista de Profesionales</h4>
      <button className="btn btn-primary mb-3" onClick={getProfesionales}>
        Listar Profesionales
      </button>
      {profesionales.map((p, i) => (
        <div key={i} className="border rounded p-2 mb-2">
          <div><strong>Nombre:</strong> {p.nombre}</div>
          <div><strong>Apellido:</strong> {p.apellido}</div>
          <div><strong>Matrícula:</strong> {p.matricula}</div>
          <div>
            <strong>Especialidades:</strong>{" "}
            {p.especialidades && p.especialidades.length > 0
              ? p.especialidades.map((e) => e.nombre).join(", ")
              : "Sin especialidades"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProfesionalList;