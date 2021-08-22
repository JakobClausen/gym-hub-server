import { verify } from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { authorizationRoles } from '../constants/auth';
import { Context } from '../context/prisma';

interface authCheckerContext extends Context {
  roles?: string[];
}

export const authChecker: AuthChecker<authCheckerContext> = async (
  { context },
  roles
) => {
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
      select: { role: true },
    });
    if (!user) return false;
    if (user.role === authorizationRoles.ADMIN) return true;
    if (!roles.length) return true;
    if (roles.includes(user.role)) return true;
    return false;
  } catch (error) {
    throw new Error('Unauthorised');
  }
};
