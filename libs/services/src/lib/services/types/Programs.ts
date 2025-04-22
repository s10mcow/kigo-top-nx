export type GetProgramBrandingInfoRequest = {
  external_program_id: string;
  partner_token: string;
};

export type NotificationConfiguration = {
  support_browser_notifications: boolean;
  support_email_notifications: boolean;
  support_sms_notifications: boolean;
  notification_page_image_url: string | null;
};

export type ProgramBrandingInfo = {
  asset_catalog_id: string | null;
  color_primary: string | null;
  color_secondary: string | null;
  color_tertiary: string | null;
  created_at: string; // ISO 8601 formatted date-time string
  custom_name: string | null;
  external_program_id: string;
  favicon: string | null;
  id: string | null;
  is_enabled: boolean;
  logo: string | null;
  loyalty_program_url: string | null;
  privacy_link: string | null;
  program_id: string | null;
  program_name: string | null;
  secondary_logo: string | null;
  service_link: string | null;
  updated_at: string; // ISO 8601 formatted date-time string
  notification_configuration: NotificationConfiguration | null;
};

export type GetProgramPartnerInfoRequest = {
  external_program_id: string;
  anonymous_session_token: string;
};

export type ProgramPartnerInfo = {
  partner_id: string;
  partner_name: string;
};
