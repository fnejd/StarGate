import { api } from './api';

const fetchAdminBoard = async () => {
  try {
    const response = await api.get('/dashboard', {
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

const fetchAdminData = async () => {
  try {
    const response = await api.get('/pusers/get', {
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
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log('에러발생', error);
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
    console.log(response);
  } catch (error) {
    console.log('그룹 생성 에러:', error);
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
    console.log(response);
  } catch (error) {
    console.log('그룹 업데이트 에러:', error);
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
    console.log('그룹 삭제', response);
  } catch (error) {
    console.log('그룹 삭제 에러:', error);
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
    console.log('멤버 생성 response', response);
  } catch (error) {
    console.log('멤버 생성 에러:', error);
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
    console.log('멤버 삭제', response);
  } catch (error) {
    console.log('멤버 삭제 에러:', error);
  }
};

export {
  fetchAdminBoard,
  fetchAdminData,
  fetchGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  createMember,
  updateMember,
  deleteMember,
};
