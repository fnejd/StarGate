import axios, { AxiosResponse } from 'axios';
import { api } from './api';

// 대기방 정보 불러오기
const postLetter = async (letterData) => {
  try {
    const response = await api.post('/letters/write', letterData);
    return response.data;
  } catch (error) {
    console.error('편지 전송 실패', error);
  }
};

// 개별 편지 가져오기
const getEachLetter = async (no: number) => {
  try {
    const response = await api.get(`/letters/get/${no}`);
    return response.data;
  } catch (error) {
    console.error('개별 편지 가져오기 실패', error);
  }
};

export { postLetter, getEachLetter };
