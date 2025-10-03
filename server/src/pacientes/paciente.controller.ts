
const app = express()
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sanatorio"
} );

app.post('/api/pacientes',  (req, res) =>{
    const {nombre, apellido, dni, email, telefono} = req.body

    const paciente = new Paciente(nombre, apellido, dni, email, telefono)

    paciente.push(paciente)
    res.status(201).send({message: 'Paciente creado', data: paciente})
})



app.get('/api/pacientes', (req, res) =>{
    res.json({data: pacientes})
})

app.get("/pacientes", (req: Request,res: Response): void =>{

    db.query('SELECT * FROM  pacientes',
        (err, result) => {
            if (err){
                console.error(err)
            }else{
                res.send(result);
            }
        }
    );
})



app.post("/create", (req: Request,res: Response) =>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const dni= req.body.dni;
    const email= req.body.email;
    const telefono= req.body.telefono;

    db.query('INSERT INTO pacientes(nombre, apellido, dni, email, telefono) VALUES(?, ?, ?, ?, ?)', [nombre, apellido, dni, email, telefono],
        (err, result) => {
            if (err){
                console.log(err)
            }else{
                res.send("Paciente registrado con éxito!")
            }
        }
    );
})
