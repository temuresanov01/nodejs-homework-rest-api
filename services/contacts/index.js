const Contacts = require('../../repository/contacts')
const {CustomError} = require('../../middlewares/error-headler')

class ContactsService {
    async getAll(query, user) {
        const { limit = 5, skip = 0, sortBy, sortByDesc, filter } = query
        let sortCriteria = null
        let select = null
        if (sortBy) {
            sortCriteria = { [sortBy]: 1}
    }
    if(sortByDesc) {
        sortCriteria = { [sortByDesc]: -1}
        }
        if (filter) {
            select = filter.split('|').join(' ')
        }
        const result = await Contacts.listContacts({ limit, skip, sortCriteria, select }, user)
        return result
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