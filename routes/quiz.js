const express = require('express')
const router = express.Router()
// const Account = require('../models/schema').Account
const Deck = require('../models/schema').Deck

router.get('/deck/:id/card/:cardNum/:side', function (req, res) {
  req.session.card = req.params.cardNum
  let side = req.params.side
  if (side === 'front') {
    Deck.findOne({
      _id: req.session.deckId
    })
    .then(function (deck) {
      let question = deck.cards[req.session.card - 1].question
      res.render('cardFront', {
        user: req.user,
        title: 'Card Front',
        deck: deck,
        question: question,
        score: req.session.score,
        cardNum: req.session.card,
        deckSize: req.session.deckSize
      })
    })
  } else { // if side === 'back'
    Deck.findOne({
      _id: req.session.deckId
    })
    .then(function (deck) {
      let question = deck.cards[req.session.card - 1].question
      let answer = deck.cards[req.session.card - 1].answer
      res.render('cardBack', {
        user: req.user,
        title: 'Card Back',
        deck: deck,
        question: question,
        answer: answer,
        score: req.session.score,
        cardNum: req.session.card,
        deckSize: req.session.deckSize
      })
    })
  }
})

router.post('/quiz', function (req, res) {
  req.session.score = 0
  res.redirect(`/deck/${req.session.deckId}/card/1/front`)
})

router.post('/flipTheCard', function (req, res) {
  res.redirect(`/deck/${req.session.deckId}/card/${req.session.card}/back`)
})

router.post('/nextCard', function (req, res) {
  let newCard = parseInt(req.session.card) + 1
  req.session.card = newCard
  console.log('new card =' + req.session.card)
  if (req.body.result === 'Right') {
    req.session.score = req.session.score + 1
  }
  // determine if at the end of the deck
  if (req.session.card > req.session.deckSize) {
    console.log('end of deck')
    res.redirect(`/deck/${req.session.deckId}/complete`)
  } else {
    res.redirect(`/deck/${req.session.deckId}/card/${req.session.card}/front`)
  }
})

module.exports = router
