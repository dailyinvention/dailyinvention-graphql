const mysql = require('mysql')
const Promise = require('bluebird')
const using = Promise.using
const credentials = require('../.user_credentials')
Promise.promisifyAll([
  require('mysql/lib/Connection'),
  require('mysql/lib/Pool')
])
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: credentials.username,
  password: credentials.password,
  database: credentials.database
})
let getConnection = function () {
  return pool.getConnectionAsync().disposer((connection) => {
    return connection.destroy()
  })
}
let query = function (command) {
  return using(getConnection(), (connection) => {
    return connection.queryAsync(command)
  })
}

module.exports.query = query
