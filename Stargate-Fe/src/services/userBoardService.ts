import Swal from 'sweetalert2';
import { api } from './api';

const fetchUserBoard = async () => {
  try {
    const response = await api.get('/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
  }
};

const fetchUserData = async () => {
  try {
    const response = await api.get('/fusers/get', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
  }
};

const updateUserData = async (formData: FormData) => {
  try {
    const response = await api.put('/fusers/update', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    Swal.fire('수정 완료', '유저 데이터가 수정되었습니다!', 'success');
    return response.data;
  } catch (error) {
  }
};

const fetchRemindData = async (uuid : string) => {
  try {
    const response = await api.get(`/reminds/${uuid}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
  }
};
export { fetchUserBoard, fetchUserData, updateUserData, fetchRemindData };
