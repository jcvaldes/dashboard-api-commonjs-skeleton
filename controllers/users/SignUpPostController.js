const User = require('../../models/user')

const signUp = (req, res) => {
  const user = new User()
  const {
    name,
    lastname,
    email,
    password,
    confirmPassword,
    agreement = true,
    role = 'CUSTOMER',
  } = req.body
  user.name = name
  user.lastname = lastname
  user.email = email
  user.password = password
  user.agreement = agreement
  user.role = role
  if (role === 'CUSTOMER') {
    user.active = false
  } else {
    user.active = true
  }
  if (!password || !confirmPassword) {
    res.status(400).send({ message: 'Password is required' })
  }
  user.save((err, userStored) => {
    if (err) {
      return res
        .status(400)
        .send({ ok: false, message: 'Error al crear el usuario.' })
    } else {
      if (!userStored) {
        return res
          .status(400)
          .send({ ok: false, message: 'El Usuario no existe' })
      } else {
        return res.status(200).send({ ok: true, message: 'Usuario creado' })
      }
    }
  })
}

module.exports = {
  signUp,
}
