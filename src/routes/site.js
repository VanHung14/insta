// const asyncMiddleware = require('../middleware/async')
const auth = require('../app/middleware/auth')
const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.get('/search', siteController.search)
router.get('/', auth, siteController.index)

module.exports = router