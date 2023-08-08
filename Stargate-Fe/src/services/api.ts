import axios from 'axios';

// 서버 URL 상수
const SERVER_URL = 'https://www.stargate-a406.kro.kr/api';

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

export { api };
