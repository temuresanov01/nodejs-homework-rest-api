const express = require('express')
const {schemaCreateContact, schemaMongoId, schemaFavoriteContact} = require('./validation')
const {validation, validationParams, validationFavorite} = require('../../../middlewares/validation')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact}  = require('../../../controllers/contacts/index')
const guard = require('../../../middlewares/guard')

router.get('/', guard, listContacts )

router.get('/:contactId', guard, validationParams(schemaMongoId), getContactById)

router.post('/', guard, validation(schemaCreateContact), addContact)

router.delete('/:contactId', guard, validationParams(schemaMongoId), removeContact)

router.put('/:contactId', guard, validationParams(schemaMongoId), validation(schemaCreateContact), updateContact)

router.patch('/:contactId/favorite', guard, validationParams(schemaMongoId), validationFavorite(schemaFavoriteContact), updateStatusContact)

module.exports = router
