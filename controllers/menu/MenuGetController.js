const Menu = require('../../models/menu')

const getMenus = (req, res) => {
  Menu.find()
    .sort({ order: 1 })
    .exec((err, menusStored) => {
      if (err) {
        return res.status(500).send({ message: 'Error interno de servidor.' })
      }
      if (!menusStored) {
        return res
          .status(400)
          .send({ message: 'No se han encontrado ningún menú.' })
      }
      return res.status(200).send({ menu: menusStored })
    })
}

module.exports = {
  getMenus,
}
