const Contacts = require('../../repository/contacts')
const {CustomError} = require('../../middlewares/error-headler')
// const { User } = require('../../models/users')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class ContactsService {
    async getAll(query) {
        
    }
    
    async getById({ email, password }) {
       
    }
    
    async create(id) {
        await Users.updateToken(id, null)
     }

    async update(email, password) { }
    async remove(email, password) { }
}

module.exports = new ContactsService()