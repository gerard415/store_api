const express = require('express')
router = express.Router()
const {getAllproductsStatic, getAllproducts} = require('../controllers/products')

router.route('/').get(getAllproducts)
router.route('/static').get(getAllproductsStatic)

module.exports = router