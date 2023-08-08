import axios, { AxiosResponse } from 'axios';
import { api } from './api';

// 미팅 생성하기
const createEvent = async (meetingData: FormData | null) => {
  if (meetingData) {
    try {
      console.log('미팅데이터&&&&&&&&&&&&&&&&&&&&&&&&&&', meetingData)
      const formDataToSend = new FormData();
      const access = localStorage.getItem('accessToken');

      // formDataToSend.append('meetingData', JSON.stringify(meetingData));
      for (const key in meetingData) {
        if (meetingData.hasOwnProperty(key)) {
          formDataToSend.append(key, meetingData[key])
        }
      }

      for (let key of formDataToSend.keys()) {
        console.log(key, ":", formDataToSend.get(key));
      }
      const response = await api.post('/meetings/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${access}`,
          withCredentials: false,
        },
      });

      console.log('미팅 생성 성공', response.data);
    } catch (error) {
      console.error('미팅 생성 실패 ', error);
    }
  }
}

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