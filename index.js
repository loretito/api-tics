const { connection } = require("./database/connection");
const express = require("express");
const bodyParser = require('body-parser')
const cors = require("cors");

//Inicia la app
console.log("App node funcionando");

//Conectar a la base de datos
connection();

// Servidor de node
const app = express();
const port = 2901;

//cors
app.use(cors());
app.use(express.json());

//datos del body a objetos js
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())


//conf. de rutas 
const authRoutes = require('./router/auth')
const dataRoutes = require('./router/data')

//rutas
app.use('/', dataRoutes)
app.use(`/auth/`, authRoutes)


// servidor y peticiones http
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
