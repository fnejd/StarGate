import axios, { AxiosResponse } from 'axios';

// 서버 URL 상수
const SERVER_URL = 'http://i9a406.p.ssafy.io:8080';

/**
 * api
 * @param baseURL => 서버 주소
 * @param withCredentials => 헤더 커스텀 할 수 있게 하는 설정
 */

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

/**
 * 소속사 그룹&멤버 data 가져오기
 */
const fetchGroup = async () => {
  try {
    const response = await api.get('/pmanagements/');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log('에러발생', error);
  }
};

export { fetchGroup };
