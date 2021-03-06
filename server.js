const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./graphql/schema.js')
var cors = require('cors')


app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Server is running on port 4000...')
})



