// src/services/auth/autht.ts
export type LoginRequestPayload = {
  user: null;
  data: {
    username: string;
    password: string;
  };
};

export type RefreshTokenPayload = {
  user: null;
  data: {
    refresh: string;
  };
};

export type AuthTokenResponse = {
  access: string;
  refresh: string;
};

export type ApiResponse<T = any> = {
  status: number;
  message: string;
  data: T;
};

export type LoginResult =
  | {
      success: true;
      data: {
        accessToken: string;
        refreshToken: string;
      };
      message?: string;
    }
  | {
      success: false;
      message: string;
    };