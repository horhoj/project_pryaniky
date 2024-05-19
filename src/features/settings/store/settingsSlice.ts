import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SLICE_NAME = 'settingsSlice';

interface IS {
  userName: string | null;
}

const initialState: IS = {
  userName: null,
};

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
    },
  },
});

export const settingsReducer = reducer;
export const settingsSlice = { actions } as const;
