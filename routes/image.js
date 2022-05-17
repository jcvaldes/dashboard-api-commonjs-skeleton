const express = require('express')
const ImageGetController = require('../controllers/shared/ImageGetController')
const { ensureAuth } = require('../middlewares/ensureAuth')

const router = express.Router()
router.get('/image/:type/:id', ImageGetController.getImage)

module.exports = router
