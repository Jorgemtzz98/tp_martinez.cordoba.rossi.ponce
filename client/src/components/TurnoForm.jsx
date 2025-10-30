import { useState, useEffect } from "react";
import Axios from "axios";
import "./styles/forms.css";

function CrearTurnoForm() {
  const [form, setForm] = useState({
    fecha: "", hora: "", profesionalId: "", pacienteDni: ""
  });
  const [profesionales, setProfesionales] = useState([]);
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const horarios = [
    "08:00","08:45","09:30","10:15","11:00","11:45",
    "12:30","13:15","14:00","14:45","15:30","16:15",
    "17:00","17:45"
  ];

  useEffect(() => {
    Axios.get("http://localhost:3001/api/profesionales")
      .then(res => setProfesionales(res.data.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (form.profesionalId && form.fecha) {
      Axios.get("http://localhost:3001/api/turnos/ocupados", {
        params: { profesionalId: form.profesionalId, fecha: form.fecha }
      }).then(res => setHorasOcupadas(res.data))
        .catch(err => console.error(err));
    }
  }, [form.profesionalId, form.fecha]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMensaje("");
    try {
      await Axios.post("http://localhost:3001/api/turnos", form);
      setMensaje("Turno creado con éxito ✅");
      setForm({ fecha: "", hora: "", profesionalId: "", pacienteDni: "" });
    } catch (err) {
      console.error(err);
      setMensaje("Error al crear turno ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h4>Crear nuevo turno</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-col">
            <label>Fecha</label>
            <input
              type="date"
              className="form-input"
              min={new Date().toISOString().split("T")[0]}
              value={form.fecha}
              onChange={e => setForm({...form, fecha: e.target.value})}
              required
            />
          </div>
          <div className="form-col">
            <label>Hora</label>
            <select
              className="form-select"
              value={form.hora}
              onChange={e => setForm({...form, hora: e.target.value})}
              required
              disabled={!form.profesionalId || !form.fecha}
            >
              <option value="">Seleccione un horario</option>
              {horarios.map(h => (
                <option key={h} value={h} disabled={horasOcupadas.includes(h)}>
                  {h} {horasOcupadas.includes(h) ? "⛔ Ocupado" : ""}
                </option>
              ))}
            </select>
          </div>
          <div className="form-col">
            <label>Profesional</label>
            <select
              className="form-select"
              value={form.profesionalId}
              onChange={e => setForm({...form, profesionalId: e.target.value})}
              required
            >
              <option value="">Seleccione un profesional</option>
              {profesionales.map(p => (
                <option key={p.id} value={p.id}>{p.nombre} {p.apellido}</option>
              ))}
            </select>
          </div>
          <div className="form-col">
            <label>DNI del paciente</label>
            <input
              className="form-input"
              type="text"
              value={form.pacienteDni}
              onChange={e => setForm({...form, pacienteDni: e.target.value})}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creando..." : "Crear turno"}
        </button>
        {mensaje && (
          <div className={`alert ${mensaje.includes("✅") ? "alert-success" : "alert-danger"}`}>
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}

export default CrearTurnoForm;
