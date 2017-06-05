var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp)

var should = chai.should();
let server = require('../server')
let Blog = require('../models/blog')
let User = require('../models/user')

var idUser = ''
describe('user', () => {
  beforeEach(done => {
    let newUser = new User({
      "name": "Uci Arahito",
      "username": "arahito",
      "password": "arahito",
      "email": "arahito@gmail.com"
    })
    newUser.save((error, user) => {
      idUser = user._id
      done()
    })
  })

  afterEach(done => {
    User.remove({},(error) => {
      done()
    })
  })

  describe('GET - all user', () => {
    it('should get all user', (done) => {
      chai.request(server)
      .get('/allusers')
      .end((error, res) => {
        console.log(res.body);
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.equal(1)

        done()
      })
    })
  })

  describe('POST -create user', () => {
    it('should ceate new user', (done) => {
      chai.request(server)
      .post('/signup')
      .send({
        name: "Butet Silaen",
        username: "butet",
        password: "butet",
        email: "butet@gmail.com"
      })
      .end((error, res) => {
        console.log(res.body);
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('name')
        res.body.should.have.property('username')
        res.body.should.have.property('password')
        res.body.should.have.property('email')

        res.body.name.should.equal('Butet Silaen')

        done()
      })
    })
  })

  // $2a$10$QnNQYJnYUADmhDcusKcHoOnYBJ.q2LqvcSxnZJZNrhjCknbmYoYua
  describe('POST - login user', () => {
    it('should login user', (done) => {
      chai.request(server)
      .post('/signin')
      .send({
        username: "arahito",
        password: "arahito"
      })
      .end((error, res) => {
        console.log("******",res.body);

        // res.should.have.status(200)
        // res.body.should.be.a('object')
        // res.body.should.have.property('message')
        // res.body.should.have.property('id')
        // res.body.should.have.property('username')
        // res.body.should.have.property('token')
        //
        // res.body.message.should.equal('SignIn success')
        // res.body.username.should.equal('butet')

        done()
      })

    })
  })

})

describe('blog', () => {
  let idBlog = ''
  beforeEach(done => {
    console.log('Ini idUser: ');
    console.log(idUser);
    let newBlog = new Blog({
      "author": idUser,
      "title": "Sunshine becomes you",
      "content": "Sunshine becomes you will comming soon",
      "createdDate": new Date(),
      "updatedDate": new Date()
    })
    newBlog.save((error, blog) => {
      idBlog = blog._id
      done()
    })
  })

  afterEach(done => {
    Blog.remove({},(error) => {
      done()
    })
  })

  describe('GET - all blog', () => {
    it('should get all blog', (done) => {
      chai.request(server)
      .get('/getallblog')
      .end((error, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.equal(1)

        done()
      })
    })
  })

  describe('POST -create blog', () => {
    it('should ceate new blog', (done) => {
      chai.request(server)
      .post('/addblog')
      .send({
        author: idUser,
        title: "Sunshine becomes you",
        content: "Sunshine becomes you will comming soon",
        created: new Date(),
        updated: new Date()
      })
      .end((error, res) => {
        console.log(res.body);

        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('author')
        res.body.should.have.property('title')
        res.body.should.have.property('content')
        res.body.should.have.property('created')
        res.body.should.have.property('updated')

        res.body.title.should.equal('Sunshine becomes you')

        done()
      })
    })
  })

  describe('PUT - update blog', () => {
    it('should update the blog', (done) => {
      chai.request(server)
      .put(`/updateBlog/${idBlog}`)
      .send({
        "author": idUser,
        "title": "Sunshine becomes me",
        "content": "Sunshine becomes me will comming soon",
        "created": new Date(),
        "updated": new Date()
      })
      .end((error, res) => {
        console.log(res.body);

        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('author')
        res.body.should.have.property('title')
        res.body.should.have.property('content')
        res.body.should.have.property('created')
        res.body.should.have.property('updated')

        res.body.title.should.equal('Sunshine becomes you')

        done()
      })
    })
  })

  describe('DELETE - delete blog', () => {
    it('should delete the blog', (done) => {
      chai.request(server)
      .delete(`/deleteBlog/${idBlog}`)
      .end((error, res) => {
        console.log(res.body);

        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('author')
        res.body.should.have.property('title')
        res.body.should.have.property('content')
        res.body.should.have.property('created')
        res.body.should.have.property('updated')

        res.body.title.should.equal('Sunshine becomes you')

        done()
      })
    })
  })
})

