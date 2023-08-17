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
      return response.data;
    } catch (error) {
      console.error('미팅 생성 실패 ', error);
    }
  }
};

const updateEvent = async (meetingData: FormData, uuid: string) => {
  if (meetingData) {
    try {
      const formDataToSend = new FormData();

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
      formDataToSend.forEach((e) => console.log(e));
      formDataToSend.append('uuid', uuid);
      const response = await api.put('/meetings/update', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('미팅 수정 성공', response.data);
    } catch (error) {
      console.error('미팅 수정 실패 ', error);
    }
  }
};

const fetchEventDetailData = async (location: string) => {
  try {
    const response = await api.get(`/meetings/get/${location}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
    console.log(location);
    console.log('에러발생', error);
  }
};

const fetchLettersData = async (uuid: string) => {
  try {
    const response = await api.post(
      '/letters/get-meeting',
      {
        uuid: uuid,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: false,
      }
    );
    console.log('letters:', response);
    return response.data;
  } catch (error) {
    console.log(uuid);
    console.log('letters 에러발생', error);
  }
};
export { createEvent, updateEvent, fetchEventDetailData, fetchLettersData };
