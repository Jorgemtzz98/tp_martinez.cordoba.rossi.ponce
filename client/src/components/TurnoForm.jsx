import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function CrearTurnoForm() {
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    profesionalId: "",
    pacienteDni: "",
  });
  
  const horarios = [
    "08:00", "08:45", "09:30", "10:15", "11:00", "11:45",
    "12:30", "13:15", "14:00", "14:45", "15:30", "16:15",
    "17:00", "17:45",
  ];

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");


  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profesionales")
      .then((res) => setProfesionales(res.data.data))
      .catch((err) => console.error("Error cargando profesionales:", err));
  }, []);

  useEffect(() => {
    if (form.profesionalId && form.fecha) {
      axios
        .get("http://localhost:3001/api/turnos/ocupados", {
          params: {
            profesionalId: form.profesionalId,
            fecha: form.fecha,
          },
        })
        .then((res) => setHorasOcupadas(res.data))
        .catch((err) => console.error("Error cargando horarios ocupados:", err));
    }
  }, [form.profesionalId, form.fecha]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje("");

    try {
      const res = await axios.post("http://localhost:3001/api/turnos", {
        fecha: form.fecha,
        hora: form.hora,
        profesionalId: form.profesionalId,
        pacienteDni: form.pacienteDni,
      });

      setMensaje(res.data.message || "Turno creado con éxito ✅");
      setForm({ fecha: "", hora: "", profesionalId: "", pacienteDni: "" });
    } catch (err) {
      if (err.response) {
        setMensaje(err.response.data.message || "Error al crear turno ❌");
      } else {
        setMensaje("Error de conexión con el servidor ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Crear nuevo turno</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-input"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            min={new Date().toISOString().split("T")[0]} 
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label">Profesional:</label>
          <select
            className="form-select"
            value={form.profesionalId}
            onChange={(e) =>
              setForm({ ...form, profesionalId: e.target.value })
            }
            required
          >
            <option value="">Seleccione un profesional</option>
            {profesionales.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellido}
              </option>
            ))}
          </select>
        </div>

        <div className="form-col">
          <label className="form-label">Hora:</label>
          <select
            className="form-select"
            value={form.hora}
            onChange={(e) => setForm({ ...form, hora: e.target.value })}
            required
            disabled={!form.profesionalId || !form.fecha}
          >
            <option value="">Seleccione un horario</option>
            {horarios.map((hora) => (
              <option key={hora} value={hora} disabled={horasOcupadas.includes(hora)}>
                {hora} {horasOcupadas.includes(hora) ? "⛔ Ocupado" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="form-col">
          <label className="form-label">DNI del paciente:</label>
          <input
            type="text"
            className="form-input"
            value={form.pacienteDni}
            onChange={(e) => setForm({ ...form, pacienteDni: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creando..." : "Crear turno"}
        </button>

        {mensaje && (
          <div
            className={`mt-3 alert ${
              mensaje.includes("éxito") ? "alert-success" : "alert-danger"
            }`}
          >
            {mensaje}
          </div>
        )}
      </form>
    </div>
  );
}

export default CrearTurnoForm;