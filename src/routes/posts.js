const auth = require('../app/middleware/auth')
const admin = require('../app/middleware/admin')
const express = require('express')
const router = express.Router()

const postController = require('../app/controllers/PostController')

    
router.get('/create', auth, postController.create)
router.post('/store', auth, postController.store)
router.get('/:id/edit', postController.edit)
router.put('/:id/', postController.update)
router.delete('/:id/', [auth, admin], postController.delete)
router.get('/:slug', postController.show)

module.exports = router