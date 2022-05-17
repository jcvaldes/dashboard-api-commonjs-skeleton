const User = require('../../models/user')

const signUp = (req, res) => {
  const user = new User()
  const { name, lastname, email, password, confirmPassword, agreement } =
    req.body
  user.name = name
  user.lastname = lastname
  user.email = email
  user.password = password
  user.role = 'CUSTOMER'
  user.agreement = agreement
  user.active = true
  if (!password || !confirmPassword) {
    res.status(400).send({ message: 'Password is required' })
  }
  user.save((err, userStored) => {
    if (err) {
      return res
        .status(400)
        .send({ ok: false, message: 'El usuario ya existe.' })
    } else {
      if (!userStored) {
        return res
          .status(404)
          .send({ ok: false, message: 'Error al crear el usuario.' })
      } else {
        return res.status(200).send({ ok: true, message: 'Usuario creado' })
      }
    }
  })
}

module.exports = {
  signUp,
}
