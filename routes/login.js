const express = require('express')
const router = express.Router()
const Account = require('../models/schema').Account
// const Deck = require('../models/schema').Deck

// allow a user to login
router.get('/login', function (req, res) {
  res.render('login')
})

router.post('/loginUser', function (req, res) {
  console.log('enter login post')
  Account.findOne({
    username: req.body.username,
    password: req.body.password
  })
  .then(function (account) {
    console.log('found account' + account)
    if (account) {
      req.session.userId = account._id
      res.redirect('/')
    } else {
      let loginError = 'Username not found'
      res.render('login', {
        loginError: loginError
      })
    }
  })
  .catch(function (error) {
    console.log('error: ' + error)
  })
})

// allow a user to register for the site
router.post('/register', function (req, res) {
  if (req.body.password === req.body.passwordConf) {
    console.log('trying to create new account')
    const account = new Account()
    account.username = req.body.username
    account.password = req.body.password
    account.location = req.body.location
    account.save()
    .then(function (account) {
      console.log('saved new user')
      req.session.userId = account._id
      res.redirect('/')
    })
    .catch(function (error) {
      console.log('error: ' + error)
    })
  } else {
    let registerError = 'Passwords did not match'
    res.render('login', {
      registerError: registerError
    })
  }
})

// allow a user to logout
module.exports = router
