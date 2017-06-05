const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  createdDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    default: Date.now()
  }
})

let User = mongoose.model('User', userSchema)
module.exports = User