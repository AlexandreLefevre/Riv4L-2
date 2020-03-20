const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
}, {
  timestamps: true,
})

const user = mongoose.model('user', UserSchema)

module.exports = user
