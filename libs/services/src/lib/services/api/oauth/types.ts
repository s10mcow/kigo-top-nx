export type AccountLogInResponse = {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  access_token: string;
  refresh_token: string;
  mobile_onboarding_stage: string;
  is_new: boolean;
};

export type SignInWithGoogleRequest = {
  access_token: string;
};

export type SignInWithAppleRequest = {
  email: string | undefined;
  id_token: string;
  first_name: string | undefined;
  last_name: string | undefined;
};

export type SignInWithEmailAndPasswordRequest = {
  email: string;
  password: string;
};

export type SignUpWithEmailAndPasswordRequest = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  external_program_id: string;
};

export type AppleOAuthResponse = {
  authorization: {
    state: string;
    code: string;
    id_token: string;
  };
  user?: {
    email: string;
    name: {
      firstName: string;
      lastName: string;
    };
  };
};
