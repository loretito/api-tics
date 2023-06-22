const Dispositivo = require('../models/dispositivo');
const jwt = require("../utils/jwt");

//login
const login = async ( req, res, ) => {
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
}

//token
const refreshToken = async( req, res ) => {
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



module.exports = {
    login,
    refreshToken
}