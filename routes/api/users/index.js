const express = require('express')
const { avatar }  = require('../../../controllers/users')
const guard = require('../../../middlewares/guard')
const upload = require('../../../middlewares/upload')
const {wrapper:wrapperError } = require('../../../middlewares/error-headler')
const router = express.Router()

router.patch('/avatar', guard, upload.single(avatar), wrapperError(avatar))


module.exports = router
