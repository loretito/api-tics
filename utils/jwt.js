const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = 'krqEklk09ikAfFmlGvz0'


const createAccessToken = (id) => {
    const expToken = new Date()
    expToken.setHours(expToken.getHours() + 3)

    const payload = {
        token_type: 'access',
        id: id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY)
}


const createRefreshToken = ( id ) => {
    const expToken = new Date()
    expToken.setHours(expToken.getMonth() + 1)

    const payload = {
        token_type: 'refresh',
        id: id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY)
}

const decoded = ( token ) => {
  return jwt.decode(token, JWT_SECRET_KEY, true)
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded
}