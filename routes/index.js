const express = require('express')
const router = express.Router()
// const Account = require('../models/schema').Account
const Deck = require('../models/schema').Deck

// load the homepage
router.get('/', function (req, res) {
  let user = req.user
  Deck.find({
    userId: req.session.userId
  })
  .then(function (decks) {
    console.log('decks: ' + decks)
    res.render('index', {
      decks: decks,
      user: user
    })
  })
  .catch(function (errors) {
    res.render('index', {
      user: user
    })
  })
})

router.post('/newDeck', function (req, res) {
  const deck = new Deck()
  deck.deckName = req.body.deckName
  deck.userId = req.session.userId
  deck.save()
  .then(function (deck) {
    console.log('deck saved')
    res.redirect('/')
  })
  .catch(function (error) {
    console.log('error: ' + error)
    res.redirect('/')
  })
})

module.exports = router
