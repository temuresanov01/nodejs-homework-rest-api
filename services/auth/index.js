const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const {CustomError} = require('../../middlewares/error-headler')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
    async create(body) {
        const user = await Users.findByEmail(body.email)
        if (user) {
            throw new CustomError(409, 'User already exists')
        }
        const newUser = await Users.create(body)

        return {
            id: newUser.id,
            email: newUser.email,
        }
    }
    
    async login({ email, password }) {
        const user = await this.getUser(email, password)
        if (!user) {
            throw new CustomError(404, 'Invalid credentials',
            )
        }
        const token = this.generateToken(user)
        await Users.updateToken(user.id, token)
        return {token}
    }
    
    async logout(id) {
        await Users.updateToken(id, null)
     }

    async getUser(email, password) {
        const user = await Users.findByEmail(email)
        if (!user) {
            return null            
        }
        if (!(await user.isValidPassword(password))) {
            return null
        }
        return user
    }

    generateToken(user) {
        const payload = {id: user.id }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
        return token
    }
}

module.exports = new AuthService()