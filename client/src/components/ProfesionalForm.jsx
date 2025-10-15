import { useState, useEffect } from "react";
import Axios from "axios";

function ProfesionalForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [matricula, setMatricula] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadesSeleccionadas, setEspecialidadesSeleccionadas] = useState([]);

  // Cargar especialidades existentes al montar
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
        especialidades: especialidadesSeleccionadas, // Enviamos IDs de especialidades
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
    <div className="card p-3 mb-3">
      <h4>Registrar Profesional</h4>
      <div className="row g-2">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
        </div>

        <div className="col-md-6">
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
          <small className="text-muted">Mantén Ctrl (o Cmd en Mac) para seleccionar múltiples</small>
        </div>
      </div>

      <button className="btn btn-success mt-3" onClick={add}>
        Registrar
      </button>
    </div>
  );
}

export default ProfesionalForm;