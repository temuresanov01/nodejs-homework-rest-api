const authServise = require('../../services/auth/index')

const registration = async (req, res) => {
    const user = await authServise.create(req.body)
    console.log('registration ~ user', user)
    return res.status(201).json({
        status: 'success',
        code: 201,
        data: {...user},
    })
}
 
const login = async (req, res) => {
    const token = await authServise.login(req.body)
    return res.status(200).json({
        status: 'success',
        code: 200,
        data: {token},
    })
}
 
const logout = async (req, res) => { 
    await authServise.logout(req.user.id)
        return res.status(204).json()
}

module.exports = {registration, login, logout}