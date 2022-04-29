const { status } = require("express/lib/response")

const avatar = async (req, res, next) => {
    const uploadServise = new UploadServise(localStorage, req.file, req.user)
    const avatarUrl = await uploadServise.updateAvater()
    res.status(201)
    res.json({ status: 'success', code: 201, payload: { avatarUrl: req.file } } )
}

module.exports = { avatar }