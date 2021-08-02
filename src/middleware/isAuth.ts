import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { Context } from '../context/prisma';

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
    const user = await context.prisma.user.findUnique({
      where: { id: userId },
      select: { gymId: true },
    });
    if (!user) {
      throw new Error('Unauthorised');
    }
    const { gymId } = user;
    context.payload = { userId, gymId };
  } catch (error) {
    console.log('isAuth error', error);
    throw new Error('Unauthorised');
  }

  return next();
};
