const express = require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const index = require('./routes/index')
const cors = require('cors')
require('dotenv').config()
app.use(cors())

// mongoose.connect('mongodb://localhost/blog-tdd')

var db_config = {
    development: 'mongodb://localhost/blog-tdd',
    test: 'mongodb://localhost/blog-test'
}

var app_env = app.settings.env
console.log('------------ app_env: ', app_env);

mongoose.connect(db_config[app_env], (err, res) => {
    console.log('Connect to database' + db_config[app_env]);
});

// app.set('port', process.env.PORT || 3000)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger('dev'))

app.use('/', require('./routes'))

// app.listen(app.get('port'), () => {
//   console.log('Listen on port: '+app.get('port'));
// })

app.listen(3000)
module.exports = app