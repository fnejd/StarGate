import axios, { AxiosResponse } from 'axios';

interface tokenType {
  accessToken: string;
  refreshToken: string;
}

interface newTokenType {
  accessToken: string;
}

const api = axios.create({
  baseURL: 'http://i9a406.p.ssafy.io:8080',
});

// 로그인 요청 성공 시 엑세스 토큰 헤더에 넣고 리프레쉬 토큰 로컬 스토리지에 저장
const onSuccessLogin = (response: AxiosResponse<tokenType>) => {
  const { accessToken, refreshToken } = response.data;
  console.log(response.status);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  console.log(
    'accessToken: ' + accessToken + ', refreshToken: ' + refreshToken
  );
};

// AccessToken이 없을 때,(만료됐을 때 재발급)
const onNewAccessToken = (response: AxiosResponse<newTokenType>) => {
  const { accessToken } = response.data;
  console.log(response.status);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

};

const loginApi = async (formData: FormData) => {
  // 유저 로그인 요청
  // fullfiled 로그인 성공, 토큰들 반환
  // rejected 에러 발생, status 401
  let response = 'SUCCESS';
  await api
    .post('/fusers/login', formData)
    .then(onSuccessLogin)
    .catch((error) => {
      console.log(error);
      response = 'FAIL';
    });
  
  return response;
};

const signUpApi = async (formData: FormData) => {
  const response = await api
    .post('/fusers/register', formData)
    .then()
    .catch((error) => console.log(error));

  return response;
};

const reAccessApi = async () => {
  const refreshToken = JSON.stringify(localStorage.getItem('refreshToken'));

  await api
    .post('/jwt/new-access-token', refreshToken)
    .then(onNewAccessToken)
    .catch((error) => console.log(error));
}

export { onSuccessLogin, loginApi, reAccessApi, signUpApi };
