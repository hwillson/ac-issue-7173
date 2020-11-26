const { ApolloServer, gql } = require("apollo-server");

const foos = [
  {
    id: 1,
    name: "Foo 1",
  },
  {
    id: 2,
    name: "Foo 2",
  },
];

const results = [
  {
    id: 1,
    name: "Result 1",
    description: "The first result",
    foos,
  },
  {
    id: 2,
    name: "Result 2",
    description: "The second result",
    foos,
  },
  {
    id: 3,
    name: "Result 3",
    description: "The third result",
    foos,
  },
  {
    id: 4,
    name: "Result 4",
    description: "The fourth result",
    foos,
  },
  {
    id: 5,
    name: "Result 5",
    description: "The fifth result",
    foos,
  },
  {
    id: 6,
    name: "Result 6",
    description: "The sixth result",
    foos,
  },
  {
    id: 7,
    name: "Result 7",
    description: "The seventh result",
    foos,
  },
  {
    id: 8,
    name: "Result 8",
    description: "The eighth result",
    foos,
  },
];

const typeDefs = gql`
  type Foo {
    id: ID
    name: String
  }

  type Result {
    id: ID
    name: String
    description: String
    foos(ids: [String]): [Foo]
  }

  type Results {
    totalResults: Int
    page: Int
    perPage: Int
    results: [Result]
  }

  type Query {
    search(
      index: String!
      query: String
      filter: String
      page: Int!
      perPage: Int!
      ranking: [String!]
      hasFooIds: Boolean = false
      fooIds: [String]
    ): Results
  }
`;

const resolvers = {
  Query: {
    search(_, { page = 0, perPage = 2 }) {
      const start = page * perPage;
      return {
        totalResults: results.length,
        page,
        perPage,
        results: results.slice(start, start + perPage),
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
