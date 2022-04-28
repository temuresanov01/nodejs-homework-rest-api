const ContactsService = require('../../services/contacts')

const listContacts =  async (req, res) => {
  const contacts = await ContactsService.getAll(req.query, req.user)
  res.json({ status: 'success', code: 200, payload: {...contacts} })
}

module.exports = listContacts