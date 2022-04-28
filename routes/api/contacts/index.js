const express = require('express')
const {schemaCreateContact, schemaMongoId, schemaFavoriteContact} = require('./validation')
const {validation, validationParams, validationFavorite} = require('../../../middlewares/validation')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact}  = require('../../../controllers/contacts/index')
const guard = require('../../../middlewares/guard')
const {wrapper:wrapperError } = require('../../../middlewares/error-headler')

router.get('/', guard, listContacts )

router.get('/:contactId', guard, validationParams(schemaMongoId), wrapperError(getContactById))

router.post('/', guard, validation(schemaCreateContact),  wrapperError(addContact))

router.delete('/:contactId', guard, validationParams(schemaMongoId),  wrapperError(removeContact))

router.put('/:contactId', guard, validationParams(schemaMongoId), validation(schemaCreateContact),  wrapperError(updateContact))

router.patch('/:contactId/favorite', guard, validationParams(schemaMongoId), validationFavorite(schemaFavoriteContact),  wrapperError(updateStatusContact))

module.exports = router
