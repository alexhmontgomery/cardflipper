const Account = require('./schema').Account

function authenticate (req, res, next) {
  if (req.session.userId) {
    Account.findOne({_id: req.session.userId})
    .then(function (account) {
      req.user = account
      next()
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  authenticate: authenticate
}
