import axios from 'axios';

// 서버 URL 상수
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

/**
 * api
 * @param baseURL => 서버 주소
 * @param withCredentials => credential을 담아 보내느냐에 대한 설정
 * 1번 케이스 => 요청에 쿠키를 담아 보낼 때
 * 2번 케이스 => 요청에 인증 관련한 Authorization 헤더를 붙여서 보낼 때
 */

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  function (config) {
    // 요청 성공 직전 호출
    const access = localStorage.getItem('accessToken');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      console.log('인터셉트해서 토큰 추가', access)
    } else {
      console.log('토큰 없음')
    }
    return config;
  }, 
  function (error) {
      // 요청 에러 직전 호출
      return Promise.reject(error);
  }
);

export { api };
