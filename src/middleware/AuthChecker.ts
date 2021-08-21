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
  if (!roles.length) return !!user;
  if (!user) return false;
  return false;
};
