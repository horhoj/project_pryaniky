import { LoginPayload, LoginResponse } from './auth.types';
import { LS_KEY_API_TOKEN } from '~/api/const';
import { axiosInstanceWithoutAuth } from '~/api/apiTransport';

export const login = async (payload: LoginPayload) => {
  const res = await axiosInstanceWithoutAuth.request<LoginResponse>({
    method: 'post',
    url: '/ru/data/v3/testmethods/docs/login',
    data: payload,
  });

  if (res.data.error_code > 0) {
    throw new Error(res.data.error_message || res.data.error_text);
  }

  localStorage.setItem(LS_KEY_API_TOKEN, res.data.data.token);
};

export const logout = async () => {
  localStorage.removeItem(LS_KEY_API_TOKEN);
};

export const authApi = { login, logout } as const;
