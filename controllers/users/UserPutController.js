const User = require('../../models/user')

const putUser = (req, res) => {
  let { active = true } = req.query
  active = JSON.parse(active)
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, user) => {
    if (err) {
      res.status(500).send({ message: 'Error interno de servidor.' })
    }
    if (!user) {
      res.status(400).send({ message: 'No se ha encontrado ningún usuario.' })
    }
    res.status(200).send({ message: 'Usuario actualizado correctamente.' })
  })
}

module.exports = {
  putUser,
}
