const Dispositivo = require('../models/dispositivo');

const sendData = async( req, res ) => {
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
}

const getData = async(req, res  ) => {
  try {
    const { id } = req.params
    const dispositivo = await Dispositivo.findOne({ id_dispositivo: id})

    if(!dispositivo){
      return res.status(404).json({ error: 'Dispositivo no encontrado'})
    }

    res.status(200).json(dispositivo)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: 'Error al obtener los datos del dispositivo'})
  }
}


module.exports = {
    sendData,
    getData
}