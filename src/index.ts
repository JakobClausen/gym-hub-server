import express from "express";
import { prisma } from "./context/prisma";
import { ApolloServer, gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    yo: String
  }
`;

const resolvers = {
  Query: {
    yo: () => "Yo mt!",
  },
};

const main = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: prisma,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(3000, () => console.log("Listening at port 3000!"));
};
main();
