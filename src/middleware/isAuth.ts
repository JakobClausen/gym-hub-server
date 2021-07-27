import { verify } from 'jsonwebtoken';
import { Context } from 'src/context/prisma';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const authorization = context.req.headers['authorization'];

  if (!authorization) {
    throw new Error('Unauthorised');
  }

  try {
    const token = authorization?.split(' ')[1];
    const { userId } = verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: number;
    };
    context.payload = { userId };
  } catch (error) {
    console.log('isAuth error', error);
    throw new Error('Unauthorised');
  }

  return next();
};
