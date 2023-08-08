import axios, { AxiosResponse } from 'axios';
import { api } from './api';

// 미팅 생성하기
const createEvent = async (meetingData: FormData | null) => {
  if (meetingData) {
    // meetingData가 null이 아닐 때 API로 데이터 전송
    await api.post('/meetings/create')
    .then((res) => {
      console.log(res)
    })
  }
};

// 미팅 상세정보 불러오기
const getEvent = async () => {
  await api
    .get('/meetings/get/46a972b0-b629-4360-af01-d5dcd88f8286')
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  //   return response;
};

export { createEvent, getEvent };