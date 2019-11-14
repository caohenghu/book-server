const MongoClient = require('mongodb').MongoClient
const DB_CONN_STR = 'mongodb://localhost:27017/book'

/**
 *
 * @returns {Promise}
 */
function initMongo() {
    return MongoClient.connect(DB_CONN_STR)
}

module.exports = initMongo
