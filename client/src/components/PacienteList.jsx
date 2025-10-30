import { useEffect, useState } from "react";
import Axios from "axios";
import "./styles/list.css"

function PacienteList() {
  const [pacientes, setPacientes] = useState([]);
  const [editando, setEditando] = useState(null);
  const [obrasSociales, setObrasSociales] = useState([]);  
  const [formEdit, setFormEdit] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    telefono: "",
    obraSocialID: "",
  });

  const getPacientes = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/api/pacientes");
      setPacientes(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Error al listar pacientes");
    }
  };

  const getObrasSociales = async () => {
    try {
      const res = await Axios.get("http://localhost:3001/api/obraSocial");
      setObrasSociales(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar obras sociales");
    }
  };

  useEffect(() => {
    getPacientes();
    getObrasSociales();
  }, []);

  const handleEditar = (paciente) => {
    setEditando(paciente.id);
    setFormEdit({
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      dni: paciente.dni,
      email: paciente.email,
      telefono: paciente.telefono,
      obraSocialId: paciente.obrasocial.id 
    });
  };


  const handleGuardar = async (id) => {
    try {
      await Axios.put(`http://localhost:3001/api/pacientes/${id}`, formEdit);
      setEditando(null);
      await getPacientes();
      alert("Paciente actualizado ✅");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar paciente ❌");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este paciente?")) return;
    try {
      await Axios.delete(`http://localhost:3001/api/pacientes/${id}`);
      alert("Paciente eliminado 🗑️");
      await getPacientes();
    } catch (error) {
      console.error(error);
      alert("Este paciente tiene un turno a su nombre, elimine el turno para poder eliminar el paciente ");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-3">👩‍⚕️ Lista de Pacientes</h3>

      {pacientes.length === 0 ? (
        <p className="text-center text-muted">No hay pacientes registrados.</p>
      ) : (
        <table className="table table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Obras Sociales</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => {
              const isEdit = editando === p.id;

              const renderInput = (field) =>
                isEdit ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={formEdit[field] || ""}
                    onChange={(e) =>
                      setFormEdit({ ...formEdit, [field]: e.target.value })
                    }
                    className="form-control"
                    style={{ minWidth: "120px" }}
                  />
                ) : (
                  p[field]
                );

              return (
                <tr key={p.id}>
                  <td>{renderInput("nombre")}</td>
                  <td>{renderInput("apellido")}</td>
                  <td>{renderInput("dni")}</td>
                  <td>{renderInput("email")}</td>
                  <td>{renderInput("telefono")}</td>
                  <td>
                    {isEdit ? (
                      <select
                        className="form-select"
                        value={formEdit.obrasocialId || ""}
                        onChange={(e) =>
                          setFormEdit({ ...formEdit, obraSocialId: e.target.value })
                        }
                      >
                        {obrasSociales.map((os) => (
                          <option key={os.id} value={os.id}>
                            {os.nombre}
                          </option>
                        ))}
                      </select>
                    ) : (
                      p.obrasocial ? p.obrasocial.nombre : <em className="text-muted">—</em>
                    )}
                  </td>

                  <td>
                    {isEdit ? (
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
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PacienteList;