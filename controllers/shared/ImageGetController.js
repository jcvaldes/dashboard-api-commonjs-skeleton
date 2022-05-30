const User = require('../../models/user')
const fs = require('fs')
const path = require('path')

const getImage = (req, res) => {
  const { type, id } = req.params

  User.findById(id, (err, userStored) => {
    if (err) {
      return res.status(500).send({ ok: false, message: 'Error del servidor' })
    }
    if (!userStored) {
      return res
        .status(400)
        .send({ ok: false, message: 'Usuario no encontrado' })
    }
    const pathImage = path.resolve(
      `public/uploads/${type}/${userStored.avatar}`
    )
    if (fs.existsSync(pathImage)) {
      res.sendFile(pathImage)
    } else {
      const pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg')
      res.sendFile(pathNoImage)
    }
  })
}

module.exports = {
  getImage,
}
