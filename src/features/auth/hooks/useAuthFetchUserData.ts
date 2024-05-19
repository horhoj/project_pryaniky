import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { mainDataSlice } from '~/features/main/store/mainDataSlice';

export const useAuthFetchUserData = () => {
  const dispatch = useAppDispatch();
  const fetchDataFirstAppRunRequest = useAppSelector(
    (state) => state.mainData.fetchDataFirstAppRunRequest,
  );

  useEffect(() => {
    dispatch(mainDataSlice.thunks.fetchDataFirstAppRunThunk());
  }, []);

  return {
    isLoading: fetchDataFirstAppRunRequest.isLoading,
  };
};
