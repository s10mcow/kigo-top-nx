export type VerifyPasswordResetCodeRequest = {
  code: string;
};

export type VerifyPasswordResetCodeResponse = {
  email: string;
};

export type ResetPasswordRequest = {
  code: string;
  password: string;
};

export type PasswordResetEmailRequest = {
  email: string;
};
