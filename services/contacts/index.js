const Contacts = require('../../repository/contacts')
const {CustomError} = require('../../middlewares/error-headler')

class ContactsService {
    async getAll(query, user) {
        const contacts = await Contacts.listContacts(query, user)
        return contacts
    }
    
    async getById(id, user) {
        const contact = await Contacts.getContactById(id, user)
        if (!contact) {
            throw new CustomError(404, 'Not Faund')
        }
        return contact
    }
    
    async create(body, user) {
        const contact = await Contacts.addContact(body, user)
        return contact
     }

    async update(id, body, user) {
        const contact = await Contacts.updateContact(id, body, user)
        if (!contact) {
            throw new CustomError(404, 'Not Faund')
        }
        return contact
    }
    
    async remove(id, user) { 
         const contact = await Contacts.removeContact(id, user)
        if (!contact) {
            throw new CustomError(404, 'Not Faund')
        }
        return contact
    }

    async updateStatus(id, body, user) {
        const contact = await Contacts.updateContact(id, body, user)
        if (!contact) {
            throw new CustomError(404, 'Not Faund')
        }
        return contact
    }
}

module.exports = new ContactsService()