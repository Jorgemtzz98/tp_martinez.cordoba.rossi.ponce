import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import Axios from "axios";
import "./styles/forms.css";

function PacienteForm() {
  const [obrasSociales, setObrasSociales] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();


   useEffect(() => {
    const fetchObras = async () => {
      try {
        const res = await Axios.get("http://localhost:3001/api/obraSocial");
        setObrasSociales(res.data.data);
      } catch (error) {
        console.error("Error cargando obras sociales:", error);
      }
    };
    fetchObras();
  }, []);


  const onSubmit = async (data) => {
    try {
      await Axios.post("http://localhost:3001/api/pacientes", {...data, obrasocial: data.obrasociales});
      alert("Paciente registrado correctamente ✅");
      reset();
    } catch (error) {
      console.error(error);
      alert("Error al registrar el paciente ❌");
    }
  };

  return (
    <div className="card">
      <h4>Registrar Paciente</h4>
      <form className="form-row" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-col">
          <input
            className="form-input"
            type="text"
            placeholder="Nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {errors.nombre && (
            <span className="error">{errors.nombre.message}</span>
          )}
        </div>

        <div className="form-col">
          <input
            className="form-input"
            type="text"
            placeholder="Apellido"
            {...register("apellido", { required: "El apellido es obligatorio" })}
          />
          {errors.apellido && (
            <span className="error">{errors.apellido.message}</span>
          )}
        </div>

        <div className="form-col">
          <input
            className="form-input"
            type="text"
            placeholder="DNI"
            {...register("dni", {
              required: "El DNI es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "El DNI debe contener solo números",
              },
            })}
          />
          {errors.dni && <span className="error">{errors.dni.message}</span>}
        </div>

        <div className="form-col">
          <input
            className="form-input"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-col">
          <input
            className="form-input"
            type="tel"
            placeholder="Teléfono"
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: {
                value: /^\d+$/,
                message: "El teléfono debe contener solo números",
              },
            })}
          />
          {errors.telefono && (
            <span className="error">{errors.telefono.message}</span>
          )}
        </div>

       <div className="form-col">
          <label className="form-label">Obras Sociales</label>
          <Controller
            name="obrasociales"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <select
                multiple
                className="form-select"
                style={{ height: "120px" }}
                value={field.value}
                onChange={(e) =>
                  field.onChange(
                    [...e.target.selectedOptions].map(option => option.value)
                  )
                }
              >
                {obrasSociales.map((os) => (
                  <option key={os.id} value={os.id}>
                    {os.nombre}
                  </option>
                ))}
              </select>
            )}
            />
        </div>

        <button className="submit-btn" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
}

export default PacienteForm;