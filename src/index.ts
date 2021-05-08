import "reflect-metadata";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
  const app = express();

  const prisma = new PrismaClient();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ prisma, req, res }),
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("Listening at port 4000!"));
};
main();
