const ContactsService = require('../../services/contacts')

const addContact = async (req, res) => {
  const contacts = await ContactsService.create(req.body, req.user)
  res.status(201).json({ status: 'success', code: 201, payload: {contacts} })
}

module.exports = addContact