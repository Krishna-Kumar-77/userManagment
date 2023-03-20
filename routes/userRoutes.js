const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updatePassword
} = require('../controllers/userController')


router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/update',updatePassword)

module.exports = router