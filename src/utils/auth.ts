import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "src/schema/User";

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m",
  });

export const createRefreshToken = (user: User) =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("rid", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};
