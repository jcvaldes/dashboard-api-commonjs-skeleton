const express = require('express')
const multipart = require('connect-multiparty')
const SignUpPostController = require('../controllers/users/SignUpPostController')
const UsersGetController = require('../controllers/users/UsersGetController')
const UserPutController = require('../controllers/users/UserPutController')
const UploadAvatarPutController = require('../controllers/users/UploadAvatarPutController')

const { ensureAuth } = require('../middlewares/ensureAuth')
const uploadAvatar = multipart({ uploadDir: './uploads/avatar' })

const router = express.Router()
router.post('/signup', SignUpPostController.signUp)
router.get('/users', [ensureAuth], UsersGetController.getUsers)
router.put('/users/:id', [ensureAuth], UserPutController.putUser)
router.put(
  '/upload/avatar/:id',
  [ensureAuth, uploadAvatar],
  UploadAvatarPutController.upload
)

module.exports = router
