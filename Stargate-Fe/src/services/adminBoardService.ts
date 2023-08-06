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

const createGroup = async (name: string) => {
  try {
    const response = await api.post('/pmanagements/group/creat', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        name: name,
      },
      withCredentials: false,
    });
    console.log(response);
  } catch (error) {
    console.log('그룹 생성 에러:', error);
  }
};

const updateGroup = async (groupNo: number, name: string) => {
  try {
    const response = await api.put('/pmanagements/group/update', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        groupNo: groupNo,
        name: name,
      },
      withCredentials: false,
    });
    console.log(response);
  } catch (error) {
    console.log('그룹 업데이트 에러:', error);
  }
};

const createMember = async (groupNo: number, name: string) => {
  try {
    const response = await api.post('/pmanagements/member/update', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        groupNo: groupNo,
        members: {
          name: name,
        },
      },
      withCredentials: false,
    });
    console.log(response);
  } catch (error) {
    console.log('멤버 생성 에러:', error);
  }
};

const updateMember = async (memberNo: number, name: string) => {
  try {
    const response = await api.put('/pmanagements/member/update', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        memberNo: memberNo,
        name: name,
      },
      withCredentials: false,
    });
    console.log(response);
  } catch (error) {
    console.log('멤버 업데이트 에러:', error);
  }
};

const deleteMember = async (memberNo: number) => {
  try {
    const response = await api.delete('/pmanagements/member/delete', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        memberNo: memberNo,
      },
      withCredentials: false,
    });
    console.log(response);
  } catch (error) {
    console.log('멤버 삭제 에러:', error);
  }
};

export {
  fetchGroup,
  createGroup,
  updateGroup,
  createMember,
  updateMember,
  deleteMember,
};
