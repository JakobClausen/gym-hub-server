import "reflect-metadata";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DateTimeResolver } from "graphql-scalars";
import { GraphQLScalarType } from "graphql";
import { UserResolver } from "./resolvers/UserResolver";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { createAccessToken, sendRefreshToken } from "./utils/auth";
import { RefreshTokenPayload } from "./types/jwtTypes";
import cors from "cors";

const main = async () => {
  const app = express();
  app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
  app.use(cookieParser());
  const prisma = new PrismaClient();

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.rid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: RefreshTokenPayload;
    try {
      payload = verify(
        token,
        process.env.REFRESH_SECRET!
      ) as RefreshTokenPayload;
    } catch (error) {
      console.log("/refresh_token", error);
      return res.send({ ok: false, accessToken: "" });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, user);

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const schema = await buildSchema({
    resolvers: [UserResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ prisma, req, res }),
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("Listening at port 4000!"));
};
main();
