import { useState } from "react";
import axios from "axios";

function TurnoList() {
  const [turnos, setTurnos] = useState([]);

  const getTurnos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/turnos");
      const data = res.data.data;

      console.log("Turnos recibidos:", data);
      setTurnos(Array.isArray(data) ? data : data.turnos || []);
    } catch (err) {
      console.error("Error cargando turnos:", err);
      alert("Error al listar turnos");
    }
  };

  return (
    <div className="card p-3 mt-5">
      <h4 className="text-success mb-3">Turnos Registrados</h4>
      <button className="btn btn-primary mb-3" onClick={getTurnos}>
        Listar Turnos
      </button>

      {turnos.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Pacientes</th>
              <th>Profesional</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map((t) => (
              <tr key={t.id}>
                <td>{t.fecha}</td>
                <td>{t.hora}</td>
                <td>
                  {t.pacientes?.map((p) => `${p.nombre} ${p.apellido}`).join(", ")}
                </td>
                <td>{t.profesional?.nombre} {t.profesional?.apellido}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No hay turnos cargados aún.</p>
      )}
    </div>
  );
}

export default TurnoList;