const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");
const Dispositivo = require("./models/dispositivo");

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

// servidor y peticiones http
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
