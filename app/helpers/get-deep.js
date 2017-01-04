const _ = require('underscore')

module.exports = function getDeep (parent, path) {
  return _.reduce(path.split('.'), function (memo, key) {
    return (memo && typeof memo === 'object') ? memo[key] : undefined
  }, parent)
}
