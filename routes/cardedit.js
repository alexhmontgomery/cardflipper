const express = require('express')
const router = express.Router()
// const Account = require('../models/schema').Account
const Deck = require('../models/schema').Deck

// allow user to edit a card
router.get('/deck/:id/editcard', function (req, res) {
  Deck.findOne({
    _id: req.session.deckId
  })
  .then(function (deck) {
    req.session.cardId = deck.cards[req.session.card - 1]._id
    let question = deck.cards[req.session.card - 1].question
    let answer = deck.cards[req.session.card - 1].answer
    res.render('editCard', {
      user: req.user,
      title: 'Edit Card',
      deck: deck,
      question: question,
      answer: answer,
      cardNum: req.session.card,
      deckSize: req.session.deckSize
    })
  })
})

router.post('/editCard', function (req, res) {
  res.redirect('/deck/:id/editcard')
})

router.post('/editResults', function (req, res) {
  Deck.findOne({
    _id: req.session.deckId
  })
  .then(function (deck) {
    deck.cards[req.session.card - 1].question = req.body.question
    deck.cards[req.session.card - 1].answer = req.body.answer
    deck.save()
  })
  .then(function (deck) {
    res.redirect(`/deck/${req.session.deckId}`)
  })
  .catch(function (error) {
    console.log('error: ' + error)
  })
})

// delete a card from the deck
router.post('/deleteCard', function (req, res) {
  console.log('attempt to delete card id: ' + req.session.cardId)
  Deck.update(
      {_id: req.session.deckId},
    {$pull: {
      cards: {
        _id: req.session.cardId
      }
    }}
    )
  .then(function (deck) {
    res.redirect(`/deck/${req.session.deckId}`)
  })
  .catch(function (error) {
    console.log('error: ' + error)
  })
})

module.exports = router
