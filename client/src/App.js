import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    const[pacientesList, setPacientes] = useState([]);


    const getPacientes = () =>{
      Axios.get("https://localhost:3001/pacientes").then((response)=>{
        setPacientes(response.data);
      });
    }

    const add = ()=> {
      Axios.post("http://localhost:3001/create",{
        nombre:nombre,
        apellido:apellido,
        dni:dni,
        email:email,
        telefono:telefono,
      }).then(()=>{
        alert("Paciente registrado");
      });
      }



g
  return (
    <div className="container">
    <div className="App">
      <div className="Datos">
        <label>Nombre: <input 
        onChange={(event)=>{
          setNombre(event.target.value);
        }}
        type="text"/></label>
        <label>Apellido: <input 
        onChange={(event)=>{
          setApellido(event.target.value);
        }}
        type="text"/></label>   
        <label>DNI: <input 
        onChange={(event)=>{
          setDni(event.target.value);
        }}
        type="text"/></label>         
        <label>Email: <input 
        onChange={(event)=>{
          setEmail(event.target.value);
        }}
        type="text"/></label>
        <label>Telefono: <input 
        onChange={(event)=>{
          setTelefono(event.target.value);
        }}
        type="text"/></label>
        <button className="btn btn-success"onClick={add}>Registrar</button>

        {
          pacientesList.map((val,key)=>{
            return <div className="listado"> 
              <div>Nombre: {val.nombre}</div>
              <div>Apellido: {val.apellido}</div>
              <div>DNI: {val.dni}</div>
              <div>Email: {val.email}</div>
              <div>Telefono: {val.telefono}</div> 
            </div>
          })
        }


      </div>
        <div className='lista'>
          <button onClick={getPacientes}>Listar</button>
        </div>
      </div>
      </div>
  );
}

export default App;
