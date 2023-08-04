import axios from "axios";

// 서버 URL 상수
const SERVER_URL = 'http://i9a406.p.ssafy.io:8080';

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
})

export { api };