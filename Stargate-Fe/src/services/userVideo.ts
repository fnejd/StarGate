import { api } from './api';

// 대기방 정보 불러오기
const getReady = async (uuid: string) => {
  try {
    const queryString = `?uuid=${uuid}`;
    const response = await api.get('/readyroom/get' + queryString);
    return response.data;
  } catch (error) {
  }
};

// 폴라로이드 사진 여부
const postPolraroidOption = async (uuid, meetingMembers) => {
  try {
    const postData = {
      uuid: uuid,
      meetingMembers: meetingMembers,
    };
    const response = await api.post(
      '/readyroom/polaroid-enable/write',
      postData
    );
    return response;
  } catch (error) {
  }
};

// 전달할 포스트잇
const postNotePad = async (postitData) => {
  try {
    const response = await api.post('/postit/write', postitData);
    return response;
  } catch (error) {
  }
};

// 전달할 메모
const postMemo = async (noteData) => {
  try {
    const response = await api.post('/readyroom/memo/write', noteData);
    return response;
  } catch (error) {
  }
};

// 유저 비디오 접속
const getUserVideo = async (uuid: string) => {
  try {
    const queryString = `?uuid=${uuid}`;
    const response = await api.get('/meetingroom/fuser/get' + queryString);
    return response.data;
  } catch (error) {
  }
};

const postPicture = async (formData) => {
  try {
    const response = await api.post('/polaroids/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
  }
};

export {
  getReady,
  postPolraroidOption,
  postNotePad,
  postMemo,
  getUserVideo,
  postPicture,
};
