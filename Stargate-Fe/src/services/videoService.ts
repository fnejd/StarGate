import axios, { AxiosError, AxiosResponse } from 'axios';
import { api } from './api';

interface starMeetingDataType {
  waitingTime: number;
  meetingTime: number;
  photoNum: number;
  memberNo: number;
  meetingFUsers: [
    {
      email: string;
      name: string;
      nickname: string;
      birthday: string;
      isPolaroidEnable: boolean;
      postitContents: string;
      totalMeetingCnt: number;
    },
  ];
}

// 연예인 화상통화 정보 가져오기
const getStarMeetingDataApi = async (params: string) => {
  let response;
  await api
    .get(`/meetingroom/member/get?roomId=${params}`)
    .then((res: AxiosResponse<starMeetingDataType>) => {
      response = res.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.code == '600') {
          throw new Error(error.message);
        } else throw new Error('알 수 없는 오류 발생');
      }
      console.log(error);
    });
  return response;
};

export { getStarMeetingDataApi };
