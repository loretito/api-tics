const jwt = require('jsonwebtoken')

const auth = ( req, res, next ) => {        
  if(!req.headers.authorization) {
    res.status(403).send({ message: 'La peticion no tiene la cabecera de autenticacion'})
  }

  next()
}

module.exports = { 
    auth
}