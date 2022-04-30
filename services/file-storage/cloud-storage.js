const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
const { unlink } = require('fs/promises')
const Users = require('../../repository/users')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id
    this.filePath = file.path
    this.idAvatarCloud = user.idAvatarCloud
    this.folderAvatars = process.env.CLOUD_FOLDER
    this.uploadCloud = promisify(cloudinary.uploader.upload)
  }

  async save() {
    const { public_id: returnedIdAvatarCloud, secure_url: userUrlAvatar } =
      await this.uploadCloud(this.filePath, {
        public_id: this.idAvatarCloud,
        folder: this.folderAvatars,
      });
    const newIdAvatarCloud = returnedIdAvatarCloud.replace(
      `${this.folderAvatars}/`,
      ""
    )
    await Users.updateAvatar(this.userId, userUrlAvatar, newIdAvatarCloud);
    await this.removeUploadFile(this.filePath)
    return userUrlAvatar
  }

  async removeUploadFile(filePath) {
    try {
      await unlink(filePath);
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports =  CloudStorage
