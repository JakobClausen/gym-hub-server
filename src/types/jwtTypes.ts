export type AccessTokenPayload = {
  userId: number;
};

export type RefreshTokenPayload = {
  userId: number;
  tokenVersion: number;
};
