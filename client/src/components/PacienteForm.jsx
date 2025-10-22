import { useState } from "react";
import Axios from "axios";
import "./styles/forms.css";

function PacienteForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const add = async () => {
      if (!nombre || !apellido || !dni || !email || !telefono.length === 0) {
      alert("Completa todos los campos y selecciona al menos una especialidad");
      return;
    }
    try {
      await Axios.post("http://localhost:3001/api/pacientes", {
        nombre,
        apellido,
        dni,
        email,
        telefono,
      });
      alert("Paciente registrado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al registrar el paciente");
    }
  };

return (
  <div className="card">
    <h4 className="card-title">Registrar Paciente</h4>
    <div className="form-row">
      <div className="form-col">
        <input
          className="form-input"
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="form-col">
        <input
          className="form-input"
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div className="form-col">
        <input
          className="form-input"
          type="number"
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
      </div>
      <div className="form-col">
        <input
          className="form-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-col">
        <input
          className="form-input"
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>
    </div>
    <button className="submit-btn" onClick={add}>
      Registrar
    </button>
  </div>
);
}

export default PacienteForm;