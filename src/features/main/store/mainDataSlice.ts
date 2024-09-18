import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Userdoc } from '../types';
import { getApiErrors } from '~/api/common';
import {
  RequestList,
  RequestStateProperty,
  makeRequestExtraReducer,
  makeRequestStateProperty,
} from '~/store/helpers';
import { userdocsApi } from '~/api/userdocs';
import { FetchUserdocsResponse } from '~/api/userdocs.types';
import { settingsSlice } from '~/features/settings/store/settingsSlice';
import { authSlice } from '~/features/auth/store/authSlice';
import { ApiError } from '~/api/common.types';

const SLICE_NAME = 'mainData';

interface IS {
  isEdit: boolean;
  isAdd: boolean;
  editRowId: string | null;
  fetchDataFirstAppRunRequest: RequestStateProperty<
    FetchUserdocsResponse,
    ApiError
  >;
  fetchUserdocsRequest: RequestStateProperty<FetchUserdocsResponse, ApiError>;
  patchUserdocsRequest: RequestStateProperty<unknown, ApiError>;
  addUserdocsRequest: RequestStateProperty<unknown, ApiError>;
  deleteUserDocRequest: RequestStateProperty<unknown, ApiError>;
}

const initialState: IS = {
  isEdit: false,
  isAdd: false,
  editRowId: null,
  fetchDataFirstAppRunRequest: makeRequestStateProperty({ isLoading: true }),
  fetchUserdocsRequest: makeRequestStateProperty(),
  patchUserdocsRequest: makeRequestStateProperty(),
  addUserdocsRequest: makeRequestStateProperty(),
  deleteUserDocRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setFetchUserDocsRequest: (
      state,
      action: PayloadAction<
        RequestStateProperty<FetchUserdocsResponse>['data']
      >,
    ) => {
      state.fetchUserdocsRequest.data = action.payload;
    },
    setEditRowId: (state, action: PayloadAction<string | null>) => {
      state.editRowId = action.payload;
    },
    setIsEdit: (state, action: PayloadAction<boolean>) => {
      state.isEdit = action.payload;
    },
    setIsAdd: (state, action: PayloadAction<boolean>) => {
      state.isAdd = action.payload;
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchDataFirstAppRunThunk,
      'fetchDataFirstAppRunRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      fetchUserdocsThunk,
      'fetchUserdocsRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      patchUserDocsThunk,
      'patchUserdocsRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      addUserDocThunk,
      'addUserdocsRequest',
    );
    makeRequestExtraReducer<RequestList<IS>>(
      builder,
      deleteDocThunk,
      'deleteUserDocRequest',
    );
  },
});

const fetchDataFirstAppRunThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchUserDataThunk`,
  async (_, store) => {
    try {
      // Я понимаю что данная санка выглядит нелогично, так как я вроде как два раза запрашиваю данные при обновлении страницы
      // так как единственный эндпоинт это фетч списка документов
      // изначально логика в том что бы сделать запрос при обновлении страницы и на его основе убедится, что токен актуален
      // в теории можно бы решить эту проблему через кэширование (например через RTKQuery или reactQuery)
      // но нужно ли вам использование данных технологий?
      // по идее нужен эндпоинт АПИ по которому можно запросить например данные по юзеру и  реагировать на ответ,
      // пуская пользователя в защищенные роуты или нет, если токен не рабочий
      const res = await userdocsApi.fetchUserdocs();
      store.dispatch(authSlice.actions.setIsAuth(true));
      store.dispatch(actions.setFetchUserDocsRequest(res));
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      store.dispatch(authSlice.actions.setIsAuth(false));
      store.dispatch(settingsSlice.actions.setUserName(null));
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

const fetchUserdocsThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchUserdocsThunk`,
  async (_, store) => {
    try {
      const res = await userdocsApi.fetchUserdocs();
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

interface PatchUserDocsThunkPayload {
  id: string;
  data: Userdoc;
}

const patchUserDocsThunk = createAsyncThunk(
  `${SLICE_NAME}/patchUserDocsThunk`,
  async ({ data, id }: PatchUserDocsThunkPayload, store) => {
    try {
      const res = await userdocsApi.patchUserdoc(id, data);
      store.dispatch(fetchUserdocsThunk());
      store.dispatch(actions.setIsEdit(false));
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

interface AddUserDocThunkPayload {
  data: Userdoc;
}

const addUserDocThunk = createAsyncThunk(
  `${SLICE_NAME}/addUserDocThunk`,
  async ({ data }: AddUserDocThunkPayload, store) => {
    try {
      const res = await userdocsApi.addUserdoc(data);
      store.dispatch(fetchUserdocsThunk());
      store.dispatch(actions.setIsAdd(false));
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

const deleteDocThunk = createAsyncThunk(
  `${SLICE_NAME}/deleteDocThunk`,
  async (id: string, store) => {
    try {
      const res = await userdocsApi.deleteUserdoc(id);
      store.dispatch(fetchUserdocsThunk());
      store.dispatch(actions.setIsAdd(false));
      return store.fulfillWithValue(res);
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

export const mainDataReducer = reducer;

export const mainDataSlice = {
  actions,
  thunks: {
    fetchDataFirstAppRunThunk,
    fetchUserdocsThunk,
    patchUserDocsThunk,
    addUserDocThunk,
    deleteDocThunk,
  },
};
