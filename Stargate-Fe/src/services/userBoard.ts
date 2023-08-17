import axios, { AxiosResponse } from 'axios';
import { api } from './api';

// 대기방 정보 불러오기
const postLetter = async (letterData) => {
  try {
    const response = await api.post('/letters/write', letterData);
    return response;
  } catch (error) {
    console.error('편지 전송 실패', error);
  }
};

export { postLetter };
