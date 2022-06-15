const express = require('express')
const multipart = require('connect-multiparty')
const MercadoPagoPostController = require('../controllers/payments/MercadoPagoPostController')

const { ensureAuth } = require('../middlewares/ensureAuth')

const router = express.Router()
router.post('/purchase/:productId', MercadoPagoPostController.createPayment)

module.exports = router
