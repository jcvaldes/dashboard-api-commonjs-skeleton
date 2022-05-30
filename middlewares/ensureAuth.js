const jwt = require('jwt-simple')
const moment = require('moment')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }
  const token = req.headers.authorization.split(' ')[1]
  try {
    const payload = jwt.decode(token, JWT_SECRET_KEY)
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'El token ha expirado' })
    }
    req.user = payload
  } catch (error) {
    return res.status(401).send({ message: 'Token no válido' })
  }
  next()
}

module.exports = {
  ensureAuth,
}
