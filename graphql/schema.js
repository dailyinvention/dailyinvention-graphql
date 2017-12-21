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
    post_status: {type: GraphQLString},
    post_title: {type: GraphQLString},
    post_content: {type: GraphQLString}
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
      args: {
        post_status: {type: GraphQLString},
        limit: {type: GraphQLInt}
      },
      resolve(parentValue, args) {
        let post_status_query = (args.post_status) ? ' WHERE post_status="' + args.post_status + '"' : ''
        let limit = (args.limit) ? ' LIMIT ' + args.limit : ''
        // Query database and return post by id
        return db.query('SELECT * FROM wp_posts' + post_status_query + limit + ';').then(results => {
          let newResults = JSON.parse(JSON.stringify(results))
          return newResults
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: Query
})