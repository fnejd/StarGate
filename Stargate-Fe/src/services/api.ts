import axios from 'axios';

// 서버 URL 상수
const SERVER_URL = 'https://www.stargate-a406.kro.kr/api';

/**
 * api
 * @param baseURL => 서버 주소
 * @param withCredentials => 헤더 커스텀 할 수 있게 하는 설정
 */

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export { api };
