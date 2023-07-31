import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://i9a406.p.ssafy.io:8080',
});

const createEvent = (meetingData: FormData | null) => {
  if (meetingData) {
    // meetingData가 null이 아닐 때 API로 데이터 전송
  }
};

export default createEvent;
