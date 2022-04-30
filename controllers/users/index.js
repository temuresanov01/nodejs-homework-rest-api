const { AvatarStorage, LocalStorage, CloudStorage  } = require('../../services/file-storage/index')

const avatar = async (req, res, next) => {
    const avatarStorage = new AvatarStorage(LocalStorage, req.file, req.user)
//  const avatarStorage = new AvatarStorage(CloudStorage, req.file, req.user)
    const userUrlAvatar = await avatarStorage.updateAvatar()
    res.status(201)
    res.json({
        status: 'success', code: 201, payload: { avatar: userUrlAvatar },
    })
}

module.exports = { avatar }