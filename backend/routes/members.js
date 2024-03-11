const express = require('express')
const {
    createMember,
    getMember,
    deleteMember,
    updateMember,
    search
} = require('../controllers/memberController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.post('/', createMember)

router.use(requireAuth)

router.get('/:id', getMember)

router.delete('/:id', deleteMember)

router.patch('/:id', updateMember)

router.post('/search', search)

module.exports = router