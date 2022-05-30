const User = require('../../models/user')

const getOrders = (req, res) => {
  let { active = true } = req.query
  active = JSON.parse(active)
  User.find({ active }, (err, users) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno de servidor.' })
    }
    if (!users) {
      return res
        .status(404)
        .send({ message: 'No se han encontrado ningún usuario.' })
    }
    return res.status(200).send({ users })
  })
}

module.exports = {
  getOrders,
}
