import Swal from 'sweetalert2';
import { api } from './api';

const fetchAdminBoard = async () => {
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

const fetchAdminData = async () => {
  try {
    const response = await api.get('/pusers/get', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    return response.data;
  } catch (error) {
  }
};

const updateAdminData = async (formData: FormData) => {
  try {
    const response = await api.put('/pusers/update', formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: false,
    });
    Swal.fire('수정 성공', '데이터가 수정되었습니다', 'success');
    return response.data;
  } catch (error) {
  }
};

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
    return response.data;
  } catch (error) {
  }
};

const createGroup = async (name: string) => {
  try {
    const response = await api.post(
      '/pmanagements/group/create',
      {
        name: name,
        members: [],
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

const updateGroup = async (groupNo: number, name: string) => {
  try {
    const response = await api.put(
      '/pmanagements/group/update',
      {
        groupNo: groupNo,
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: false,
      }
    );
  } catch (error) {
  }
};

const deleteGroup = async (groupNo: number) => {
  try {
    const response = await api.delete('/pmanagements/group/delete', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      data: {
        groupNo: groupNo,
      },
      withCredentials: false,
    });
  } catch (error) {
  }
};

const createMember = async (groupNo: number, name: string) => {
  try {
    const response = await api.post(
      '/pmanagements/member/create',
      {
        groupNo: groupNo,
        name: name,
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

const updateMember = async (memberNo: number, name: string) => {
  try {
    const response = await api.put(
      '/pmanagements/member/update',
      {
        memberNo: memberNo,
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: false,
      }
    );
  } catch (error) {
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
  } catch (error) {
  }
};

export {
  fetchAdminBoard,
  fetchAdminData,
  updateAdminData,
  fetchGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  createMember,
  updateMember,
  deleteMember,
};
