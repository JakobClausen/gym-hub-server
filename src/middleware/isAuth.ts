import { verify } from "jsonwebtoken";
import { Context } from "src/context/prisma";
import { MiddlewareFn } from "type-graphql";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("Unauthorised");
  }

  try {
    const token = authorization?.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
    context.payload = payload as { userId: number };
  } catch (error) {
    console.log("isAuth error", error);
    throw new Error("Unauthorised");
  }

  return next();
};
