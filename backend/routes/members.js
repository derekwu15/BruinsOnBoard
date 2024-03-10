const express = require('express')
const {
    createMember,
    getMember,
    deleteMember,
    updateMember
} = require('../controllers/memberController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/:id', getMember)

router.post('/', createMember)

router.delete('/:id', deleteMember)

router.patch('/:id', updateMember)

module.exports = router