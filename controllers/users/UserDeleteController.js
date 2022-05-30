const User = require('../../models/user')

const deleteUser = (req, res) => {
  let { id } = req.params
  User.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ message: 'Error interno de servidor.' })
    }
    if (!userDeleted) {
      res.status(400).send({ message: 'No se ha encontrado ningún usuario.' })
    }
    res.status(200).send({ message: 'Usuario eliminado correctamente.' })
  })
}

module.exports = {
  deleteUser,
}
