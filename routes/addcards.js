const express = require('express')
const router = express.Router()
// const Account = require('../models/schema').Account
const Deck = require('../models/schema').Deck

router.get('/deck/:id', function (req, res) {
  req.session.deckId = req.params.id
  let user = req.user
  Deck.findOne({
    _id: req.params.id
  })
  .then(function (deck) {
    req.session.deckSize = deck.cards.length
    res.render('deck', {
      user: user,
      deck: deck,
      deckSize: req.session.deckSize
    })
  })
  .catch(function (error) {
    console.log('error: ' + error)
  })
})

router.post('/addCard', function (req, res) {
  Deck.findOne({
    _id: req.session.deckId
  })
  .then(function (deck) {
    deck.cards.push({
      question: req.body.question,
      answer: req.body.answer
    })
    deck.save()
    .then(function (deck) {
      res.redirect(`/deck/${req.session.deckId}`)
    })
  })
  .catch(function (error) {
    console.log('error: ' + error)
  })
})

module.exports = router
