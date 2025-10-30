import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/list.css";

function TurnoList() {
  const [turnos, setTurnos] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [editando, setEditando] = useState(null);
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  const [formEdit, setFormEdit] = useState({
    fecha: "",
    hora: "",
    profesionalId: "",
  });

  const horarios = [
    "08:00", "08:45", "09:30", "10:15", "11:00", "11:45",
    "12:30", "13:15", "14:00", "14:45", "15:30", "16:15",
    "17:00", "17:45",
  ];

  // --- Carga de datos ---
  const cargarTurnos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/turnos");
      setTurnos(res.data.data);
    } catch (err) {
      console.error("Error al cargar turnos:", err);
    }
  };

  const cargarProfesionales = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/profesionales");
      setProfesionales(res.data.data);
    } catch (err) {
      console.error("Error al cargar profesionales:", err);
    }
  };

  useEffect(() => {
    cargarTurnos();
    cargarProfesionales();
  }, []);

  // --- Editar turno ---
  const handleEditar = async (turno) => {
    setEditando(turno.id);
    setFormEdit({
      fecha: turno.fecha.split("T")[0],
      hora: turno.hora,
      profesionalId: turno.profesional.id,
    });

    try {
      const res = await axios.get("http://localhost:3001/api/turnos/ocupados", {
        params: {
          profesionalId: turno.profesional.id,
          fecha: turno.fecha.split("T")[0],
        },
      });
      setHorasOcupadas(res.data);
    } catch (err) {
      console.error("Error al obtener horarios ocupados:", err);
    }
  };

  // --- Guardar cambios ---
  const handleGuardar = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/turnos/${id}`, formEdit);
      setEditando(null);
      await cargarTurnos();
      alert("Turno actualizado ✅");
    } catch (err) {
      console.error("Error al actualizar turno:", err);
      alert("No se pudo actualizar el turno ❌");
    }
  };

  // --- Eliminar turno ---
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este turno?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/turnos/${id}`);
      setTurnos((prev) => prev.filter((t) => t.id !== id));
      alert("Turno eliminado 🗑️");
    } catch (err) {
      console.error("Error al eliminar turno:", err);
    }
  };

  // --- Cancelar edición ---
  const cancelarEdicion = () => {
    setEditando(null);
    setFormEdit({ fecha: "", hora: "", profesionalId: "" });
  };

  // --- Render ---
  return (
    <div className="card">
      <h3>📋 Lista de Turnos</h3>

      {turnos.length === 0 ? (
        <p className="text-center text-muted">No hay turnos registrados aún.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Profesional</th>
              <th>Paciente</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {turnos.map((turno) => {
              const enEdicion = editando === turno.id;

              if (enEdicion) {
                return (
                  <tr key={turno.id}>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={formEdit.fecha}
                        onChange={(e) =>
                          setFormEdit({ ...formEdit, fecha: e.target.value })
                        }
                      />
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={formEdit.hora}
                        onChange={(e) =>
                          setFormEdit({ ...formEdit, hora: e.target.value })
                        }
                      >
                        <option value="">Seleccioná la hora</option>
                        {horarios.map((h) => (
                          <option
                            key={h}
                            value={h}
                            disabled={horasOcupadas.includes(h)}
                          >
                            {h} {horasOcupadas.includes(h) && "⛔ Ocupado"}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={formEdit.profesionalId}
                        onChange={(e) =>
                          setFormEdit({
                            ...formEdit,
                            profesionalId: e.target.value,
                          })
                        }
                      >
                        <option value="">Seleccioná un profesional</option>
                        {profesionales.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.nombre} {p.apellido}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>{turno.paciente?.nombre || "—"}</td>

                    <td>
                      <button
                        className="btn-guardar"
                        onClick={() => handleGuardar(turno.id)}
                      >
                        💾 Guardar
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={cancelarEdicion}
                      >
                        ❌ Cancelar
                      </button>
                    </td>
                  </tr>
                );
              }

              // Modo lectura
              return (
                <tr key={turno.id}>
                  <td>{turno.fecha.split("T")[0]}</td>
                  <td>{turno.hora}</td>
                  <td>
                    {turno.profesional.nombre} {turno.profesional.apellido}
                  </td>
                  <td>{turno.paciente?.nombre || "—"}</td>
                  <td>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(turno)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(turno.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TurnoList;