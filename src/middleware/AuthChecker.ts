import { AuthChecker } from 'type-graphql';
import { Context } from '../context/prisma';

interface authCheckerContext extends Context {
  roles: string[];
}

export const authChecker: AuthChecker<authCheckerContext> = (
  { context: { payload } },
  roles
) => {
  const { user } = payload;
  if (!user) return false;
  if (!roles.length) return true;
  if (roles.includes(user.role)) return true;
  return false;
};
