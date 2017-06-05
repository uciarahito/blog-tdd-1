const Blog = require('../models/blog')
let methods = {}

methods.getAllBlog = (req, res) => {
  Blog.find({})
  .populate('author')
  .exec((err, response) => {
    if (err) res.json({err})
    console.log('Get all blog success');
    console.log(response);
    res.send(response)
  })
}

methods.getBlogById = (req, res) => {
  Blog.findById(req.params.id, (err, response) => {
    if (err) res.json({err})
    console.log('Get detail blog success');
    console.log(response);
    res.send(response)
  })
}

methods.createBlog = (req, res) => {
  let newBlog = new Blog({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content
  })

  newBlog.save((error, response) => {
    if (error) res.json({error})
    console.log('Create new blog success');
    console.log(response);
    res.send(response)
  })
}

methods.updateBlog = (req, res) => {
  Blog.findById(req.params.id, (err, response) => {
    if (err) res.json({err})
    console.log('Get detail blog success');
    console.log(response);
    Blog.updateOne({
      "_id": response._id
    }, {
      $set: {
        "author": req.body.author || response.author,
        "title": req.body.title || response.title,
        "content": req.body.content || response.content
      }
    })
    .then(result => {
      res.send(response)
    })
    .catch(error => {
      res.json({error})
    })
  })
}

methods.deleteBlog = (req, res) => {
  Blog.findById(req.params.id, (err, response) => {
    if (err) res.json({err})
    console.log('Get detail blog success');
    console.log(response);
    Blog.deleteOne({
      "_id": response._id
    })
    .then(result => {
      res.send(response)
    })
    .catch(error => {
      res.json({error})
    })
  })
}

module.exports = methods