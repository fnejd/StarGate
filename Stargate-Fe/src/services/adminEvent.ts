import axios, { AxiosResponse } from 'axios';
import { api } from './api';

// 미팅 생성하기
const createEvent = async (meetingData: FormData | null) => {
  if (meetingData) {
    try {
      const formDataToSend = new FormData();
      const access = localStorage.getItem('accessToken');

      for (const key in meetingData) {
        if (meetingData.hasOwnProperty(key)) {
          if (key === 'meetingFUsers' || key === 'meetingMembers') {
            formDataToSend.append(key, JSON.stringify(meetingData[key]));
          } else {
            formDataToSend.append(key, meetingData[key]);
          }
        }
      }

      for (let key of formDataToSend.keys()) {
        console.log(key, ':', formDataToSend.get(key));
      }
      const response = await api.post('/meetings/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${access}`,
          // withCredentials: false,
        },
      });

      console.log('미팅 생성 성공', response.data);
    } catch (error) {
      console.error('미팅 생성 실패 ', error);
    }
  }
};

// 미팅 상세정보 불러오기
const getEvent = async () => {
  try {
    // const response = await api.get('/meetings/create', formDataToSend, {
  } catch (error) {
    console.error('미팅 생성 실패 ', error);
  }
};

export { createEvent, getEvent };
