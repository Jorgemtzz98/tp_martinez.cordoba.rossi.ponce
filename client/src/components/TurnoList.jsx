import { useEffect, useState } from "react";
import Axios from "axios";
import "./styles/list.css";

function TurnoList() {
  const [turnos, setTurnos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({ fecha: "", hora: "", profesionalId: "" });
  const [profesionales, setProfesionales] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);

  const horarios = [
    "08:00","08:45","09:30","10:15","11:00","11:45",
    "12:30","13:15","14:00","14:45","15:30","16:15",
    "17:00","17:45"
  ];

  const getTurnos = async () => {
    try {
      const res = await Axios.get("http://localhost:3001/api/turnos");
      setTurnos(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/profesionales")
      .then(res => setProfesionales(res.data.data))
      .catch(err => console.error(err));

    getTurnos();
  }, []);

  useEffect(() => {
    if (!editando || !formEdit.profesionalId || !formEdit.fecha) {
      setHorasOcupadas([]);
      return;
    }
    Axios.get("http://localhost:3001/api/turnos/ocupados", {
      params: { profesionalId: formEdit.profesionalId, fecha: formEdit.fecha }
    })
    .then(res => setHorasOcupadas(res.data))
    .catch(err => console.error(err));
  }, [formEdit.profesionalId, formEdit.fecha, editando]);

  const handleEditar = (turno) => {
    setEditando(turno.id);
    setFormEdit({
      fecha: turno.fecha.split("T")[0],
      hora: turno.hora,
      profesionalId: turno.profesional.id,
    });
  };

  const handleGuardar = async (id) => {
    try {
      await Axios.put(`http://localhost:3001/api/turnos/${id}`, formEdit);
      setEditando(null);
      await getTurnos();
      alert("Turno actualizado con éxito ✅");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar turno ❌");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este turno?")) return;
    try {
      await Axios.delete(`http://localhost:3001/api/turnos/${id}`);
      setTurnos(turnos.filter(t => t.id !== id));
      alert("Turno eliminado correctamente 🗑️");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card">
      <h4>Lista de Turnos</h4>
      {turnos.length === 0 && <p className="text-muted">No hay turnos registrados.</p>}

      {turnos.length > 0 && (
        <table className="list-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Profesional</th>
              <th>Paciente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnos.map(turno => (
              <tr key={turno.id}>
                <td>
                  {editando === turno.id ? (
                    <input
                      type="date"
                      className="form-input"
                      value={formEdit.fecha}
                      onChange={e => setFormEdit({ ...formEdit, fecha: e.target.value })}
                    />
                  ) : turno.fecha.split("T")[0]}
                </td>
                <td>
                  {editando === turno.id ? (
                    <select
                      className="form-select"
                      value={formEdit.hora}
                      onChange={e => setFormEdit({ ...formEdit, hora: e.target.value })}
                      disabled={!formEdit.profesionalId || !formEdit.fecha}
                    >
                      <option value="">Seleccione un horario</option>
                      {horarios.map(h => (
                        <option
                          key={h}
                          value={h}
                          disabled={horasOcupadas.includes(h) && h !== turno.hora}
                        >
                          {h} {horasOcupadas.includes(h) && h !== turno.hora ? "⛔ Ocupado" : ""}
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
                      onChange={e =>
                        setFormEdit({ ...formEdit, profesionalId: e.target.value, hora: "" })
                      }
                    >
                      <option value="">Seleccione un profesional</option>
                      {profesionales.map(p => (
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
                <td className="list-actions">
                  {editando === turno.id ? (
                    <>
                      <button className="action-btn save" onClick={() => handleGuardar(turno.id)}>💾 Guardar</button>
                      <button className="action-btn cancel" onClick={() => setEditando(null)}>❌ Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="action-btn edit" onClick={() => handleEditar(turno)}>✏️ Editar</button>
                      <button className="action-btn delete" onClick={() => handleEliminar(turno.id)}>🗑️ Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TurnoList;
