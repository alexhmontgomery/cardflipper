const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  location: {type: String}
})

const deckSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  deckName: {type: String, required: true},
  cards: [{
    question: {type: String},
    answer: {type: String}
  }]
})

module.exports = {
  Account: mongoose.model('Account', accountSchema),
  Deck: mongoose.model('Deck', deckSchema)
}
