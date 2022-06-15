const auth = require('../app/middleware/auth')
const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')

    
router.get('/stored/posts', auth, meController.storedPosts)

module.exports = router