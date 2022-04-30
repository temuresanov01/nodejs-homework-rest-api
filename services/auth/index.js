const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
// const {CustomError} = require('../../middlewares/error-headler')
const SECRET_KEY = process.env.JWT_SECRET_KEY

// class AuthService {
//     async create(body) {
//         const user = await Users.findByEmail(body.email)
//         if (user) {
//             throw new CustomError(409, 'User already exists')
//         }
//         const newUser = await Users.create(body)

//         return {
//             id: newUser.id,
//             email: newUser.email,
//         }
//     }
    
//     async login({ email, password }) {
//         const user = await this.getUser(email, password)
//         if (!user) {
//             throw new CustomError(404, 'Invalid credentials',
//             )
//         }
//         const token = this.generateToken(user)
//         await Users.updateToken(user.id, token)
//         return {token}
//     }
    
//     async logout(id) {
//         await Users.updateToken(id, null)
//      }

//     async getUser(email, password) {
//         const user = await Users.findByEmail(email)
//         if (!user) {
//             return null
//         }
//         if (!(await user.isValidPassword(password))) {
//             return null
//         }
//         return user
//     }

//     generateToken(user) {
//         const payload = {id: user.id }
//         const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '12h' })
//         return token
//     }
// }

class AuthService {
  async isUserExist(email) {
    const user = await Users.findByEmail(email);
    return !!user;
  }

  async create(body) {
    const { id, email, subscription, avatar } = await Users.create(body);
    return { id, email, subscription, avatar };
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email);
    const isValidPassword = await user?.isValidPassword(password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  getToken(user) {
    const { id, email } = user;
    const payload = { id, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    return token;
  }

  async setToken(id, token) {
    await Users.updateToken(id, token);
  }

  async getUserByToken(req, res, next) {
    const token = req.get("authorization")?.split(" ")[1];
    const payload = jwt.decode(token);
    const user = await Users.findById(payload.id);
    return user;
  }
}

module.exports = new AuthService()