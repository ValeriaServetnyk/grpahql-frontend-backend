import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String): User
    todo(id: ID): Todo
    todos(completed: Boolean): [Todo!]!

  }
  type User {
    name: String
    username: String
  }
  type Todo {
    id: ID
    title: String
    completed: Boolean
  }
`
const users = [
  { name: 'Leeroy Jenkins', username: 'leeroy' },
  { name: 'Foo Bar', username: 'foobar' },
]

const todos = [
  {id: '1', title: 'Broccoli', completed: false},
  {id: '1', title: 'Broccoli', completed: true},
];

const resolvers = {
  Query: {
    users() {
      return users
    },
    user(parent, { username }) {
      return users.find((user) => user.username === username)
    },
    todos(parent, args) {
      if (args.completed === true) {
        return todos.filter((todo) => todo.completed === true);
      } else if (args.completed === false) {
        return todos.filter((todo) => todo.completed === false);
      }
    },
    todo(parent, { id }) {
      return todos.find((todo) => todo.id === id);
    },
  },
};


export const schema = makeExecutableSchema({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },

}

export default new ApolloServer({ schema }).createHandler({
  path: '/api/graphql',
})
