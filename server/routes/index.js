const express = require('express')
const router = express.Router()
let blogController = require('../controllers/blogController')
let userController = require('../controllers/userController')

// NOTE: user
router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.get('/allusers', userController.getAllUsers)
router.get('/detailuser/:id', userController.getUserById)
router.put('/edituser/:id', userController.editUser)  // password harus disertakan
router.delete('/deleteuser/:id', userController.deleteUserById)

router.post('/addblog', blogController.createBlog)
router.get('/getallblog', blogController.getAllBlog)
router.get('/getdetailblog/:id', blogController.getBlogById)
router.put('/updateBlog/:id', blogController.updateBlog)
router.delete('/deleteBlog/:id', blogController.deleteBlog)

module.exports = router