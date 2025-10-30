import { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

function ProfesionalList() {
  const [profesionales, setProfesionales] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [editando, setEditando] = useState(null);
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    apellido: "",
    matricula: "",
  });

  // Cargar profesionales y especialidades al inicio
  useEffect(() => {
    getProfesionales();
    getEspecialidades();
  }, []);

  const getProfesionales = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/profesionales");
      setProfesionales(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Error al listar profesionales");
    }
  };

  const getEspecialidades = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/especialidades");
      setEspecialidades(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este profesional?")) return;

    try {
      await Axios.delete(`http://localhost:3001/api/profesionales/${id}`);
      alert("Profesional eliminado correctamente ✅");
      await getProfesionales();
    } catch (error) {
      console.error(error);
      alert("Este profesional ya tiene turnos asociados, para eliminarelo asegurese de que no existan mas turnos a su nombre ");
    }
  };

  const handleEditar = (prof) => {
    setEditando(prof.id);
    setFormEdit({
      nombre: prof.nombre,
      apellido: prof.apellido,
      matricula: prof.matricula,
    });
  };

  const handleGuardar = async (id) => {
    try {
      await Axios.put(`http://localhost:3001/api/profesionales/${id}`, formEdit);
      alert("Profesional actualizado correctamente ✅");
      setEditando(null);
      getProfesionales();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar profesional ❌");
    }
  };

  // Filtrar profesionales según especialidad seleccionada
  const profesionalesFiltrados = filtroEspecialidad
    ? profesionales.filter((p) =>
        p.especialidades?.some((e) => e.nombre === filtroEspecialidad)
      )
    : profesionales;

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">👩‍⚕️ Gestión de Profesionales</h3>

      {/* Filtro por especialidad */}
      <div className="mb-3 d-flex align-items-center gap-2">
        <label className="form-label mb-0">Filtrar por especialidad:</label>
        <select
          className="form-select w-auto"
          value={filtroEspecialidad}
          onChange={(e) => setFiltroEspecialidad(e.target.value)}
        >
          <option value="">Todas</option>
          {especialidades.map((esp) => (
            <option key={esp.id} value={esp.nombre}>
              {esp.nombre}
            </option>
          ))}
        </select>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Matrícula</th>
            <th>Especialidades</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profesionalesFiltrados.map((p) => (
            <tr key={p.id}>
              <td>
                {editando === p.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={formEdit.nombre}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, nombre: e.target.value })
                    }
                  />
                ) : (
                  p.nombre
                )}
              </td>

              <td>
                {editando === p.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={formEdit.apellido}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, apellido: e.target.value })
                    }
                  />
                ) : (
                  p.apellido
                )}
              </td>

              <td>
                {editando === p.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={formEdit.matricula}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, matricula: e.target.value })
                    }
                  />
                ) : (
                  p.matricula
                )}
              </td>

              <td>
                {p.especialidades && p.especialidades.length > 0
                  ? p.especialidades.map((e) => e.nombre).join(", ")
                  : "Sin especialidades"}
              </td>

              <td>
                {editando === p.id ? (
                  <>
                    <button
                      className="btn-guardar"
                      onClick={() => handleGuardar(p.id)}
                    >
                      💾 Guardar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => setEditando(null)}
                    >
                      ❌ Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn-editar"
                      onClick={() => handleEditar(p)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => handleEliminar(p.id)}
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

      {profesionalesFiltrados.length === 0 && (
        <p className="text-center text-muted">
          No hay profesionales que coincidan con el filtro.
        </p>
      )}
    </div>
  );
}

export default ProfesionalList;