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
      }
      const response = await api.post('/meetings/create', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${access}`,
          // withCredentials: false,
        },
      });
      return response.data;
    } catch (error) {
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
      }
      formDataToSend.append('uuid', uuid);
      const response = await api.put('/meetings/update', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
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
    return response.data;
  } catch (error) {
  }
};
export { createEvent, updateEvent, fetchEventDetailData, fetchLettersData };
