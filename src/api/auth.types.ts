export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  error_code: number;
  error_message: string;
  error_text: string;
  data: {
    token: string;
  };
  profiling: string;
  timings: null;
}
