const express = require('express')
const { signup, login, logout, current }  = require('../../../controllers/auth')
const {wrapper:wrapperError } = require('../../../middlewares/error-headler')
const guard = require('../../../middlewares/guard')
const router = express.Router()
const validateCreateUser = require('./validation')

router.post('/signup', validateCreateUser, wrapperError(signup))
router.post('/login', validateCreateUser, wrapperError(login))
router.post('/logout', guard, wrapperError(logout))
router.get('/current', guard, current)


module.exports = router
