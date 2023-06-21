const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const Dispositivo = require("./models/dispositivo");
const jwt = require("./utils/jwt");

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

//rutas
app.post("/datos", async (req, res) => {
  try {
    const { id_dispositivo, temperatura, ph } = req.body;
    const dateNow = new Date();

    const dispositivo = await Dispositivo.findOneAndUpdate(
      { id_dispositivo: id_dispositivo },
      {
        $push: {
          temp: { hora: dateNow, temperatura },
          ph: { hora: dateNow, ph },
        },
      },
      { new: true, upsert: true }
    );

    res.json(dispositivo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al agregar los datos" });
  }
});

//login
app.post("/login", async (req, res) => {
  const { id_dispositivo } = req.body;

  try {
    const id_d = await Dispositivo.findOne({ id_dispositivo });

    if (!id_d) {
      res.status(401).json({ message: "El id no existe" });
    } else {
      res.status(200).send({
        access: jwt.createAccessToken(id_d),
        refresh: jwt.createRefreshToken(id_d)
      })
    }
  } catch (error) {
    console.log("Error al buscar usuario", error);
    res.status(500).json({ message: "error en el servidor xd" });
  }
});

app.post( "/refresh_access_token",async ( req, res ) => {

  const { token } = req.body 

  if(!token) res.status(400).json({ message: "Token requerido" })

  const { id_t } = jwt.decoded(token)

  try {
    const id_d = await Dispositivo.findOne({ id: id_t });

    if (!id_d) {
      res.status(401).json({ message: "El id no existe" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(id_d)
      })
    }
  } catch (error) {
    console.log("Error al buscar usuario", error);
    res.status(500).json({ message: "error en el servidor xd" });
  }
}

)



// servidor y peticiones http
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
