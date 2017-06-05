const mongoose = require('mongoose')
let Schema = mongoose.Schema

let blogSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    maxLength: 500
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
}) // blogSchema

let Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog