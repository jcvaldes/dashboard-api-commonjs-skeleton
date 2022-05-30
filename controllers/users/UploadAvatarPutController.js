const User = require('../../models/user')
const path = require('path')
const fs = require('fs')
const validExtensions = ['png', 'jpg', 'jpeg', 'gif']
const upload = (req, res) => {
  const params = req.params
  User.findById({ _id: params.id }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: 'Error interno de servidor.' })
    }
    if (!user) {
      return res
        .status(404)
        .send({ message: 'No se han encontrado ningún usuario.' })
    } else {
      if (req.files) {
        let filePath = req.files.image.path
        let fileSplit = filePath.split('/')
        let fileName = fileSplit[fileSplit.length - 1]
        let fileExt = path.extname(filePath).substring(1)
        if (!validExtensions.includes(fileExt)) {
          res.status(400).send({
            message: `Las extensiones válidas son ${validExtensions.join(
              ', '
            )}`,
          })
        } else {
          user.avatar = fileName
          if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
              if (err) {
                return err
              }
            })
          }
          User.findByIdAndUpdate(
            { _id: params.id },
            user,
            (err, userUpdated) => {
              if (err) {
                res.status(500).send({ message: 'Error interno de servidor.' })
              } else {
                if (!userUpdated) {
                  res
                    .status(400)
                    .send({ message: 'No se han encontrado ningún usuario.' })
                }
                res.status(200).send({ message: 'Usuario actualizado' })
              }
            }
          )
        }
      }
    }
  })
}

module.exports = {
  upload,
}
