const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar');
const { Schema, model } = mongoose;


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: function () {
            return gravatar.url(this.email, { s: "250" }, true);
        },
    },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(6)
        console.log('^_^ ~ file: user.js ~ line 29 ~ salt', salt)
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
}); 

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = {
  User, 
}