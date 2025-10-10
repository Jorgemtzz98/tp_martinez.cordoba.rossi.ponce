import { useEffect, useState } from "react";

function TurnoList() {
  const [turnos, setTurnos] = useState([]);

useEffect(() => {
  fetch("http://localhost:3001/api/turnos")
    .then((res) => res.json())
    .then((data) => {
      console.log("Turnos recibidos:", data)
      setTurnos(Array.isArray(data) ? data : data.turnos || [])
    })
    .catch((err) => console.error("Error cargando turnos:", err))
}, [])
  return (
    <div className="mt-5">
      <h4 className="text-success mb-3">Turnos Registrados</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Pacientes</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TurnoList;