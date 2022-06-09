const express = require('express')
const MenuGetController = require('../controllers/menu/MenuGetController')
const MenuPostController = require('../controllers/menu/MenuPostController')
const MenuPutController = require('../controllers/menu/MenuPutController')
const { ensureAuth } = require('../middlewares/ensureAuth')

const router = express.Router()
router.get('/menu', MenuGetController.getMenus)
router.post('/menu', [ensureAuth], MenuPostController.addMenu)
router.put('/menu/:id', [ensureAuth], MenuPutController.updateMenu)

module.exports = router
