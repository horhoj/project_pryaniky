import { axiosInstance } from './apiTransport';
import { FetchUserdocsResponse } from './userdocs.types';
import { Userdoc } from '~/features/main/types';

export const fetchUserdocs = async () => {
  const res = await axiosInstance.request<FetchUserdocsResponse>({
    method: 'get',
    url: '/ru/data/v3/testmethods/docs/userdocs/get',
  });

  if (res.data.error_code > 0) {
    throw new Error(res.data.error_message);
  }

  return res.data;
};

export const patchUserdoc = async (id: string, data: Userdoc) => {
  const res = await axiosInstance.request<FetchUserdocsResponse>({
    method: 'post',
    url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
    data,
  });

  if (res.data.error_code > 0) {
    throw new Error(res.data.error_message);
  }

  return res.data;
};

export const addUserdoc = async (data: Userdoc) => {
  const res = await axiosInstance.request<FetchUserdocsResponse>({
    method: 'post',
    url: `/ru/data/v3/testmethods/docs/userdocs/create/`,
    data,
  });

  if (res.data.error_code > 0) {
    throw new Error(res.data.error_message);
  }

  return res.data;
};

export const deleteUserdoc = async (id: string) => {
  const res = await axiosInstance.request<FetchUserdocsResponse>({
    method: 'post',
    url: `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
  });

  if (res.data.error_code > 0) {
    throw new Error(res.data.error_message);
  }

  return res.data;
};

export const userdocsApi = {
  fetchUserdocs,
  patchUserdoc,
  addUserdoc,
  deleteUserdoc,
};
