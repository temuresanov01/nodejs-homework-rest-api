const ContactsService = require('../../services/contacts')

const updateContact = async (req, res) => {
   const contacts = await ContactsService.update(req.params.contactId, req.body, req.user)
        return res.json({ status: 'success', code: 200, payload: {contacts} })
     }

module.exports = updateContact