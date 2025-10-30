import { useState } from "react"; 
import Axios from "axios";
import "./styles/list.css";

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
    <div className="card">
      <h4>Lista de Pacientes</h4>
      <button className="submit-btn" onClick={getPacientes}>
        Listar Pacientes
      </button>

      {pacientes.length === 0 && <p className="text-muted">No hay pacientes registrados.</p>}

      {pacientes.length > 0 && (
        <table className="list-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.apellido}</td>
                <td>{p.dni}</td>
                <td>{p.email}</td>
                <td>{p.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PacienteList;
