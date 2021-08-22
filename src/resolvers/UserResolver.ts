import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { authorizationRoles } from '../constants/auth';
import { Context } from '../context/prisma';
import { Login, Register, User } from '../schema/User';
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from '../utils/auth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver(User)
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async getUser(@Ctx() ctx: Context) {
    return ctx.prisma.user.findUnique({
      where: { id: ctx.payload?.user.id },
      include: { gym: true },
    });
  }

  @Authorized([authorizationRoles.ADMIN])
  @Mutation(() => User)
  async registerUser(
    @Arg('registerUser') registerInput: Register,
    @Ctx() ctx: Context
  ) {
    const hash = await bcrypt.hash(registerInput.password, 10);
    return ctx.prisma.user.create({
      data: {
        ...registerInput,
        password: hash,
      },
    });
  }

  @Mutation(() => LoginResponse)
  async loginUser(@Arg('loginInput') loginInput: Login, @Ctx() ctx: Context) {
    const { email, password } = loginInput;
    const user = await ctx.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UserInputError('No user with this email!');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UserInputError('Password is invalid!');
    }

    sendRefreshToken(ctx.res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
    };
  }

  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context) {
    sendRefreshToken(ctx.res, '');

    return true;
  }
}
