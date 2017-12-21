const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require('graphql')
const db = require('../model/db.js')

// Define post format
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    ID: {type: GraphQLInt},
    post_status: {type: GraphQLString}
  }
})

// Define root query
const Query = new GraphQLObjectType({
  name: 'MainQuery',
  fields: {
    post: {
      type: PostType,
      args: {
        id: {type: GraphQLInt}
      },
      resolve(parentValue, args) {
        // Query database and return post by id
        return db.query('SELECT * FROM wp_posts WHERE ID="' + args.id + '";').then(results => {
          let newResults = JSON.parse(JSON.stringify(results))
          return newResults[0]
        })
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        return customers
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})