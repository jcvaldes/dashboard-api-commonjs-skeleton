const fs = require('fs')
const path = require('path')

const getImage = (req, res) => {
  const { type } = req.params
  const { img } = req.params
  const pathImage = path.join(__dirname, '../', `uploads/${type}/${img}`)
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage)
  } else {
    const pathNoImage = path.resolve(__dirname, '../assets/no-img.jpg')
    res.sendFile(pathNoImage)
  }
}

module.exports = {
  getImage,
}
