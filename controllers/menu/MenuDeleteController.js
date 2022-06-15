const Menu = require('../../models/menu')

const deleteMenu = (req, res) => {
  let { id } = req.params
  Menu.findByIdAndRemove(id, (err, menuDeleted) => {
    if (err) {
      res.status(500).send({ message: 'Error interno de servidor.' })
    }
    if (!menuDeleted) {
      res.status(400).send({ message: 'No se ha encontrado ningún menú.' })
    }
    res.status(200).send({ message: 'Menú eliminado correctamente.' })
  })
}

module.exports = {
  deleteMenu,
}
