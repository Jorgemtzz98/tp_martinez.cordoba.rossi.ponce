import { useEffect, useState } from "react";
import axios from "axios";

function TurnoList() {
  const [turnos, setTurnos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    fecha: "",
    hora: "",
    profesionalId: "",
  });
  const [profesionales, setProfesionales] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  const horarios = [
    "08:00", "08:45", "09:30", "10:15", "11:00", "11:45",
    "12:30", "13:15", "14:00", "14:45", "15:30", "16:15",
    "17:00", "17:45",
  ];

  const getTurnos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/turnos");
      setTurnos(res.data.data);
    } catch (err) {
      console.error("Error al cargar turnos:", err);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profesionales")
      .then((res) => setProfesionales(res.data.data))
      .catch((err) => console.error("Error cargando profesionales:", err));
  }, []);

  useEffect(() => {
    getTurnos();
  }, []);

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
      console.error("Error cargando horarios ocupados:", err);
    }
  };

 useEffect(() => {
  const cargarHorasOcupadas = async () => {
    if (!editando || !formEdit.profesionalId || !formEdit.fecha) {
      setHorasOcupadas([]); 
      return;
    }

    try {
      const res = await axios.get("http://localhost:3001/api/turnos/ocupados", {
        params: {
          profesionalId: formEdit.profesionalId,
          fecha: formEdit.fecha,
        },
      });
      setHorasOcupadas(res.data);
    } catch (err) {
      console.error("Error actualizando horarios ocupados:", err);
      setHorasOcupadas([]);
    }
  };

  cargarHorasOcupadas();
}, [formEdit.profesionalId, formEdit.fecha, editando]);

  const handleGuardar = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/turnos/${id}`, formEdit);
      setEditando(null);
      await getTurnos();
      alert("Turno actualizado con éxito ✅");
    } catch (err) {
      console.error("Error al actualizar turno:", err);
      alert("Error al actualizar turno ❌");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este turno?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/turnos/${id}`);
      setTurnos(turnos.filter((t) => t.id !== id));
      alert("Turno eliminado correctamente 🗑️");
    } catch (err) {
      console.error("Error al eliminar turno:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">📋 Lista de Turnos</h3>

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
          {turnos.map((turno) => (
            <tr key={turno.id}>
              {/* FECHA */}
              <td>
                {editando === turno.id ? (
                  <input
                    type="date"
                    className="form-control"
                    value={formEdit.fecha}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, fecha: e.target.value })
                    }
                  />
                ) : (
                  turno.fecha.split("T")[0]
                )}
              </td>

              <td>
                {editando === turno.id ? (
                  <select
                    className="form-select"
                    value={formEdit.hora}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, hora: e.target.value })
                    }
                    disabled={!formEdit.profesionalId || !formEdit.fecha}
                  >
                    <option value="">Seleccione un horario</option>
                    {horarios.map((hora) => (
                      <option
                        key={hora}
                        value={hora}
                        disabled={
                          horasOcupadas.includes(hora) &&
                          hora !== turno.hora // permite mantener la suya
                        }
                      >
                        {hora}
                        {horasOcupadas.includes(hora) &&
                        hora !== turno.hora
                          ? " ⛔ Ocupado"
                          : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  turno.hora
                )}
              </td>

              <td>
                {editando === turno.id ? (
              <select
                className="form-select"
                value={formEdit.profesionalId}
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    profesionalId: e.target.value,
                    hora: "", 
                  })
                }
              >
                <option value="">Seleccione un profesional</option>
                {profesionales.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} {p.apellido}
                  </option>
                ))}
              </select>
                ) : (
                  `${turno.profesional.nombre} ${turno.profesional.apellido}`
                )}
              </td>

              <td>{turno.pacientes?.[0]?.nombre || "—"}</td>

              <td>
                {editando === turno.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleGuardar(turno.id)}
                    >
                      💾 Guardar
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditando(null)}
                    >
                      ❌ Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEditar(turno)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminar(turno.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {turnos.length === 0 && (
        <p className="text-center text-muted">No hay turnos registrados.</p>
      )}
    </div>
  );
}

export default TurnoList;
