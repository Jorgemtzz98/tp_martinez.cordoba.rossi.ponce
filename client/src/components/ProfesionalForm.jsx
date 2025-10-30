import { useState, useEffect } from "react";
import Axios from "axios";
import "./styles/forms.css";

function ProfesionalForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await Axios.get("http://localhost:3001/api/especialidades");
        setEspecialidades(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEspecialidades();
  }, []);

  const handleSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setSeleccionadas(selected);
  };

  const add = async () => {
    if (!nombre || !apellido || !matricula || seleccionadas.length === 0) {
      setMensaje("Completa todos los campos y selecciona al menos una especialidad ❌");
      return;
    }
    try {
      await Axios.post("http://localhost:3001/api/profesionales", {
        nombre, apellido, matricula, especialidades: seleccionadas
      });
      setMensaje("Profesional registrado correctamente ✅");
      setNombre(""); setApellido(""); setMatricula(""); setSeleccionadas([]);
    } catch (error) {
      console.error(error);
      setMensaje("Error al registrar el profesional ❌");
    }
  };

  return (
    <div className="card">
      <h4>Registrar Profesional</h4>
      <div className="form-row">
        <div className="form-col">
          <input
            className="form-input"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="form-col">
          <input
            className="form-input"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="form-col">
          <input
            className="form-input"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </div>
        <div className="form-col">
          <label>Especialidades Médicas</label>
          <select
            multiple
            className="form-select"
            value={seleccionadas}
            onChange={handleSelectChange}
          >
            {especialidades.map(e => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
          <small>Mantén Ctrl o Cmd para seleccionar múltiples</small>
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

export default ProfesionalForm;
