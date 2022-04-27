const ContactsService = require('../../services/contacts')

const removeContact = async (req, res) => {
    const contacts = await ContactsService.remove(req.params.contactId, req.user)
       return res.json({ status: 'success', code: 200, message: 'contact deleted', payload: {contacts} })
   }

  module.exports = removeContact