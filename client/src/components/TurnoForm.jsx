import { useEffect, useState } from "react";
import axios from 'axios'

function TurnoForm() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  // 🔹 Traer pacientes del backend

useEffect(() => {
  axios.get("http://localhost:4000/pacientes")
    .then((res) => {
      console.log("Pacientes cargados:", res.data)
      setPacientes(res.data.data) // o res.data.pacientes, según el backend
    })
    .catch((err) => console.error("Error cargando pacientes:", err))
}, [])

  // 🔹 Manejar selección múltiple
  const handleSelectChange = (e) => {
    const options = e.target.options;
    const seleccion = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        seleccion.push(parseInt(options[i].value));
      }
    }
    setSeleccionados(seleccion);
  };

  // 🔹 Enviar turno
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoTurno = {
      fecha,
      hora,
      pacientes: seleccionados,
    };

    fetch("http://localhost:3001/api/turnos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoTurno),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Turno guardado correctamente ✅");
        setFecha("");
        setHora("");
        setSeleccionados([]);
      })
      .catch((err) => console.error("Error al guardar turno:", err));
  };

  return (
    <div className="card shadow p-4 mt-4">
      <h3 className="text-success mb-3">Registrar Turno</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Pacientes</label>
          <select
            multiple
            className="form-select"
            onChange={handleSelectChange}
            value={seleccionados}
          >
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
          <small className="text-muted">
            (Usá Ctrl o Shift para seleccionar varios pacientes)
          </small>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Guardar Turno
        </button>
      </form>
    </div>
  );
}

export default TurnoForm;