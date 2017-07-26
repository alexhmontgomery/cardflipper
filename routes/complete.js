const express = require('express')
const router = express.Router()
// const Account = require('../models/schema').Account
const Deck = require('../models/schema').Deck

router.get('/deck/:id/complete', function (req, res) {
  Deck.findOne({
    _id: req.session.deckId
  })
  .then(function (deck) {
    res.render('complete', {
      user: req.user,
      deck: deck,
      score: req.session.score,
      deckSize: req.session.deckSize
    })
  })
  .catch(function (error) {
    console.log('error: ' + error)
  })
})

router.post('/restartDeck', function (req, res) {
  req.session.score = 0
  res.redirect(`/deck/${req.session.deckId}/card/1/front`)
})

router.post('/chooseAnotherDeck', function (req, res) {
  res.redirect('/')
})

module.exports = router
