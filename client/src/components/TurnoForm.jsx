import { useEffect, useState } from "react";
import axios from "axios";

function CrearTurnoForm() {
  const [profesionales, setProfesionales] = useState([]);
  const [form, setForm] = useState({
    fecha: "",
    hora: "",
    profesionalId: "",
    pacienteDni: "",
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar lista de profesionales al montar el componente
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profesionales")
      .then((res) => setProfesionales(res.data.data))
      .catch((err) => console.error("Error cargando profesionales:", err));
  }, []);

  // Manejar envío del formulario
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
    <div className="container mt-4">
      <h2>Crear nuevo turno</h2>
      <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            value={form.fecha}
            onChange={(e) => setForm({ ...form, fecha: e.target.value })}
            min={new Date().toISOString().split("T")[0]} // 🔒 solo hoy en adelante
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora:</label>
          <input
            type="time"
            className="form-control"
            value={form.hora}
            onChange={(e) => setForm({ ...form, hora: e.target.value })}
            min="08:00"
            max="18:00" // 🔒 de 8 a 18hs
            required
          />
        </div>

        <div className="mb-3">
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

        <div className="mb-3">
          <label className="form-label">DNI del paciente:</label>
          <input
            type="text"
            className="form-control"
            value={form.pacienteDni}
            onChange={(e) => setForm({ ...form, pacienteDni: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
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