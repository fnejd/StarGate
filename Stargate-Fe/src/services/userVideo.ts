import axios, { AxiosResponse } from 'axios';
import { api } from './api';

// 대기방 정보 불러오기
const getReady = async (uuid: string) => {
  try {
    const queryString = `?uuid=${uuid}`;
    const response = await api.get('/readyroom/get' + queryString);
    return response.data;
  } catch (error) {
    console.error('미팅 생성 실패 ', error);
  }
};

export { getReady };
