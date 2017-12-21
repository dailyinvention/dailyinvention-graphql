const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const db = require('./model/db.js')
const schema = require('./graphql/schema.js')


app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server is running on port 4000...')
})
// db.query('SELECT * FROM wp_posts WHERE ID = "1"').then(results => {
//    console.dir(results)
// })



