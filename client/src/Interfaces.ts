export interface FormData {
  full_name: string;
  phone_number: string;
}

export interface APIResponse {
  id: number;
  full_name: string;
  phone_number: string;
}

export interface FormErrors {
  full_name?: string;
  phone_number?: string;
  api_error?: string;
}
