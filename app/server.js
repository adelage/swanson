const { json, send } = require('micro')
const getQuote = require('./get-quote')

module.exports = async function (req, res) {
  const data = await json(req)
  send(res, 200, getQuote(data))
}
