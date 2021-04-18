import express from "express";
import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server-express";

const prisma = new PrismaClient();

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
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(3000, () => console.log("Listening at port 3000!"));
};
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
