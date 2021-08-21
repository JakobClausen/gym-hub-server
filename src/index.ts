import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import jwt, { Options } from 'express-jwt';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import helmet from 'helmet';
import { verify } from 'jsonwebtoken';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { authChecker } from './middleware/AuthChecker';
import { GymClassResolver, GymResolver, UserResolver } from './resolvers';
import { WorkoutExternalApiResolver } from './resolvers/WorkoutExternalApiResolver';
import { WorkoutResolver } from './resolvers/WorkoutResolver';
import { WorkoutSectionResolver } from './resolvers/WorkoutSectionResolver';
import { RefreshTokenPayload } from './types/jwtTypes';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from './utils/auth';

const main = async () => {
  const app = express();
  app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
  app.use(cookieParser());
  app.use(helmet());
  const prisma = new PrismaClient();

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.rid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: RefreshTokenPayload;
    try {
      payload = verify(
        token,
        process.env.REFRESH_SECRET!
      ) as RefreshTokenPayload;
    } catch (error) {
      console.log('/refresh_token', error);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      GymResolver,
      GymClassResolver,
      WorkoutResolver,
      WorkoutSectionResolver,
      WorkoutExternalApiResolver,
    ],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ prisma, req, res }),
  });

  app.use(
    '/graphql',
    jwt({
      secret: 'TypeGraphQL',
      credentialsRequired: false,
    } as Options)
  );

  await server.start();

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log('Listening at port 4000!'));
};
main();
