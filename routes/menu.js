const express = require('express')
const MenuGetController = require('../controllers/menu/MenuGetController')
const MenuPostController = require('../controllers/menu/MenuPostController')
const { ensureAuth } = require('../middlewares/ensureAuth')

const router = express.Router()
router.get('/menu', MenuGetController.getMenus)
router.post('/menu', [ensureAuth], MenuPostController.addMenu)

module.exports = router
