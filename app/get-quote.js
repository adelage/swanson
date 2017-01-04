const _ = require('underscore')

const quotes = require('./quotes')
const getDeep = require('./helpers/get-deep')
const baseResponse = require('./helpers/base-response')

module.exports = function (data) {
  const character = getDeep(data, 'result.parameters.character')
  const quoteTopic = getDeep(data, 'result.parameters.quoteTopic')

  const defaultResponse = baseResponse
  defaultResponse.speech = 'I\'m sorry, I don\'t have any quotes from ' + character

  const characterQuotes = getCharacterQuotes(quotes, character)
  if (!characterQuotes) return defaultResponse

  return createResponse(characterQuotes, quoteTopic)
}

function getRandom (collection) {
  return collection[Math.floor(Math.random() * collection.length)]
}

function filterCollection (collection, filter) {
  return _.filter(collection, function (item) {
    const re = new RegExp(filter, 'i')
    return re.test(item)
  })
}

function getCharacterQuotes (quotes, character) {
  if (/^ron/i.test(character)) return quotes.ron
  if (/^leslie/i.test(character)) return quotes.leslie
  if (/^tom/i.test(character)) return quotes.tom
}

function createResponse (characterQuotes, topic) {
  let speech

  if (topic) characterQuotes = filterCollection(characterQuotes, topic) || []
  if (characterQuotes.length > 0) {
    speech = getRandom(characterQuotes)
  } else {
    speech = 'I\'m sorry, I don\'t have any quotes on ' + topic
  }

  const response = baseResponse
  response.speech = speech

  return response
}
