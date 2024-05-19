import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginPayload } from '../../../api/auth.types';
import { authApi } from '../../../api/auth';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { mainDataSlice } from '~/features/main/store/mainDataSlice';
import { settingsSlice } from '~/features/settings/store/settingsSlice';

interface IS {
  isAuth: boolean;
  loginRequest: RequestStateProperty<unknown, ApiError>;
  logoutRequest: RequestStateProperty<unknown, ApiError>;
}

const SLICE_NAME = 'authSlice';

const initialState: IS = {
  isAuth: false,
  loginRequest: makeRequestStateProperty(),
  logoutRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    loginRequestClear: (state) => {
      state.loginRequest = makeRequestStateProperty();
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      loginThunk,
      'loginRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      logoutThunk,
      'logoutRequest',
    );
  },
});

interface LoginThunkPayload {
  loginPayload: LoginPayload;
}

const loginThunk = createAsyncThunk(
  `${SLICE_NAME}/loginThunk`,
  async (payload: LoginThunkPayload, store) => {
    try {
      await authApi.login(payload.loginPayload);
      store.dispatch(actions.setIsAuth(true));
      store.dispatch(mainDataSlice.thunks.fetchUserdocsThunk());
      store.dispatch(
        settingsSlice.actions.setUserName(payload.loginPayload.username),
      );
      return null;
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

const logoutThunk = createAsyncThunk(`${SLICE_NAME}`, async (_, store) => {
  try {
    await authApi.logout();
    store.dispatch(actions.setIsAuth(false));
    store.dispatch(settingsSlice.actions.setUserName(null));
    return null;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const authReducer = reducer;
export const authSlice = {
  actions,
  thunks: {
    loginThunk,
    logoutThunk,
  },
} as const;
