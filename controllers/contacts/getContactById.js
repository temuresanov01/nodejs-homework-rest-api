const ContactsService = require('../../services/contacts')

const getContactById = async (req, res) => {
   const contacts = await ContactsService.getById(req.params.contactId, req.user)
       return res.json({ status: 'success', code: 200, payload: {contacts} })
}

module.exports = getContactById