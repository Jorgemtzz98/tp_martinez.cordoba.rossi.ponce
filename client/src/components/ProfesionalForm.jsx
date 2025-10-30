import { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";

function ProfesionalForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([]);


  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await Axios.get("http://localhost:3001/api/especialidades");
        setEspecialidades(res.data.data);
      } catch (error) {
        console.error("Error cargando especialidades:", error);
      }
    };
    fetchEspecialidades();
  }, []);

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setEspecialidadesSeleccionadas(selectedOptions);
  };

  const add = async () => {
    if (!nombre || !apellido || !matricula || especialidadesSeleccionadas.length === 0) {
      alert("Completa todos los campos y selecciona al menos una especialidad");
      return;
    }

    try {
      await Axios.post("http://localhost:3001/api/profesionales", {
        nombre,
        apellido,
        matricula,
        especialidades: especialidadesSeleccionadas, 
      });
      alert("Profesional registrado correctamente");
      setNombre("");
      setApellido("");
      setMatricula("");
      setEspecialidadesSeleccionadas([]);
    } catch (error) {
      console.error(error);
      alert("Error al registrar el profesional");
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
          <label className="form-label">Especialidades Médicas</label>
          <select
            multiple
            className="form-select"
            onChange={handleSelectChange}
            value={especialidadesSeleccionadas}
          >
            {especialidades.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nombre}
              </option>
            ))}
          </select>
          <small className="text-muted">Mantén Ctrl para seleccionar múltiples</small>
        </div>
      </div>

      <button className="submit-btn" onClick={add}>
        Registrar
      </button>
    </div>
  );
}

export default ProfesionalForm;