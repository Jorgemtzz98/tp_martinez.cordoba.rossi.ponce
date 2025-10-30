import { useState } from "react";
import Axios from "axios";
import "./styles/forms.css";

function PacienteForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const add = async () => {
    if (!nombre || !apellido || !dni || !email || !telefono) {
      setMensaje("Completa todos los campos antes de enviar ❌");
      return;
    }
    try {
      await Axios.post("http://localhost:3001/api/pacientes", {
        nombre, apellido, dni, email, telefono,
      });
      setMensaje("Paciente registrado correctamente ✅");
      setNombre(""); setApellido(""); setDni(""); setEmail(""); setTelefono("");
    } catch (error) {
      console.error(error);
      setMensaje("Error al registrar el paciente ❌");
    }
  };

  return (
    <div className="card">
      <h4>Registrar Paciente</h4>
      <div className="form-row">
        <div className="form-col">
          <input
            className="form-input"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-col">
          <input
            className="form-input"
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="form-col">
          <input
            className="form-input"
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <div className="form-col">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-col">
          <input
            className="form-input"
            type="tel"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
      </div>
      <button className="submit-btn" onClick={add}>Registrar</button>

      {mensaje && (
        <div className={`alert ${mensaje.includes("✅") ? "alert-success" : "alert-danger"}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}

export default PacienteForm;
