const ContactsService = require('../../services/contacts')

const updateStatusContact = async (req, res) => {
  const contacts = await ContactsService.updateStatus(req.params.contactId, req.body, req.user)
      return res.json({status: 'success', code: 200, payload: { contacts } })
  }
 
module.exports = updateStatusContact