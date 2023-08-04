import axios, { AxiosResponse } from 'axios';
import { api } from './api';

/**
 * 소속사 그룹&멤버 data 가져오기
 */
const fetchGroup = async () => {
  try {
    const response = await api.get('/pmanagements/get', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('에러발생', error);
  }
};

export {fetchGroup}