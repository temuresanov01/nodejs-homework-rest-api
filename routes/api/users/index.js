const express = require('express')
const { signup, login, logout, }  = require('../../../controllers/auth')
const {wrapper:wrapperError } = require('../../../middlewares/error-headler')
const guard = require('../../../middlewares/guard')
const {emailAndPasswordValidation, updateSubscriptionValidation, userIdParamValidation} = require('../../../middlewares/users')

const router = express.Router()

router.post('/signup', emailAndPasswordValidation, wrapperError(signup))
router.post('/login', emailAndPasswordValidation, wrapperError(login))
router.post('/logout', guard, wrapperError(logout))
router.patch('/:userId',)
router.get('/current',)


module.exports = router
