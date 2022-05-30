const bcrypt = require('bcrypt')
const jwt = require('../../services/jwt')
const User = require('../../models/user')
const logger = require('../../utils/logger')

const signIn = async (req, res) => {
  const { email, password } = req.body

  User.findOne({ email }, (err, userStored) => {
    if (err) {
      return res.status(500).send({ ok: false, message: 'Error del servidor' })
    }
    if (!userStored) {
      return res
        .status(400)
        .send({ ok: false, message: 'Credenciales inválidas' })
    }
    bcrypt.compare(password, userStored.password, (err, userValid) => {
      if (err) {
        return res
          .status(500)
          .send({ ok: false, message: 'Error del servidor' })
      }
      if (!userValid) {
        return res.status(400).send({
          ok: false,
          message: 'Credenciales incorrectas',
        })
      }
      if (!userStored.active) {
        return res
          .status(400)
          .send({ ok: false, message: 'Usuario no se ha activado' })
      }
      logger.log({
        level: 'info',
        message: 'USER_LOGGED',
      })
      return res.status(200).send({
        ok: true,
        accessToken: jwt.createAccessToken(userStored),
        refreshToken: jwt.createRefreshToken(userStored),
      })
    })
  })
}

module.exports = {
  signIn,
}
