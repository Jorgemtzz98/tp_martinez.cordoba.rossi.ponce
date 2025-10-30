import { useState } from "react";
import Axios from "axios";
import "./styles/list.css";

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
    <div className="card">
      <h4>Lista de Profesionales</h4>
      <button className="submit-btn" onClick={getProfesionales}>
        Listar Profesionales
      </button>

      {profesionales.length === 0 && <p className="text-muted">No hay profesionales registrados.</p>}

      {profesionales.length > 0 && (
        <table className="list-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Matrícula</th>
              <th>Especialidades</th>
            </tr>
          </thead>
          <tbody>
            {profesionales.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.matricula}</td>
                <td>{p.especialidades?.map(e => e.nombre).join(", ") || "Sin especialidades"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProfesionalList;
