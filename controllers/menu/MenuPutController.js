const Menu = require('../../models/menu')

const updateMenu = (req, res) => {
  let menuData = req.body
  const params = req.params

  Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdated) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno de servidor.' })
    }
    if (!menuUpdated) {
      return res
        .status(400)
        .send({ message: 'No se han encontrado ningún menú.' })
    }
    return res.status(200).send({ message: 'Menú actualizado correctamente.' })
  })
}

module.exports = {
  updateMenu,
}
