const express = require('express')
const router = express.Router()
const {
  getBooks,
  createBooks
} = require('../controllers/bookController')

const { protect } = require('../auth/userAuth')

router.route('/').get(protect,getBooks).post(protect,createBooks)

module.exports = router