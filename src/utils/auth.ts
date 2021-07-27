import { User } from '@prisma/client';
import { Response } from 'express';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User) =>
  sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '3h',
  });

export const createRefreshToken = (user: User) =>
  sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: '7d',
    }
  );

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('rid', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};
