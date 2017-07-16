const express = require('express')
const mustache = require('mustache-express')
const app = express()
const session = require('express-session')
// const passport = require('passport')
// const BasicStrategy = require('passport-http').BasicStrategy
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
// const Account = require('./models/schema').Account
// const Deck = require('./models/schema').Deck
const authenticate = require('./models/authentification').authenticate

app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('layout', 'layout')
app.use(express.static('public'))
app.use(bodyParser.json()) // change if you decide not to use json format
app.use(bodyParser.urlencoded({extended: false}))
mongoose.Promise = require('bluebird')
mongoose.connect = ('mongodb://localhost:27017/flipcard')

app.use(session({
  secret: 'b5990cdd42a9f97c85b8',
  cookie: {},
  resave: false,
  saveUninitialized: false
}))

// app.use(loginRoutes)
app.use(authenticate)
// app.use(AllOtherRoutes)

app.listen(3000, function () {
  console.log('Server is ON! Go to Localhost Port:3000')
})

// passport.use(new BasicStrategy(
//   function (username, password, done) {
//     Account.findOne({
//       username: username,
//       password: password
//     })
//     .then(function (account) {
//       if (account) {
//         done(null, account)
//       } else {
//         done(null, false)
//       }
//     })
//   }
// ))

// app.use(passport.authenticate('basic', {session: false}))
