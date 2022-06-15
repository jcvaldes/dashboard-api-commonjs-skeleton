const Menu = require('../../models/menu')

const addMenu = (req, res) => {
  const { title, url } = req.body
  const menu = new Menu()
  menu.title = title
  menu.url = url
  menu.order = 1000
  menu.active = false
  menu.save((err, menuStored) => {
    if (err) {
      return res
        .status(400)
        .send({ ok: false, message: 'Error al crear el menú item.' })
    } else {
      if (!menuStored) {
        return res
          .status(400)
          .send({ ok: false, message: 'El menú item no existe' })
      } else {
        return res
          .status(200)
          .send({ ok: true, message: 'Menú item creado correctamente' })
      }
    }
  })
}

module.exports = {
  addMenu,
}
