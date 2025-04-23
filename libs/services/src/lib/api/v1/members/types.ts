export interface AddMemberCardRequest {
  encrypted_card_number: string;
}

export interface EnrollMemberRequest {
  zip_code: string;
  encrypted_card_number: string;
  email: string;
  email_opt_in: boolean;
  first_name: string;
  last_name: string;
}
