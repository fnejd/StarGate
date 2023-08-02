import axios, { AxiosResponse } from 'axios';

interface tokenType {
  accessToken: string;
  refreshToken: string;
}

interface newTokenType {
  accessToken: string;
}

interface checkEmailType {
  exist: boolean;
}

const api = axios.create({
  baseURL: 'http://i9a406.p.ssafy.io:8080',
});

// common => 토큰 만료시간 체크 메서드
// Back으로 넘어가는 API 호출 최대한 줄이게
// API 호출 전에 만료여부 체크
const checkTokenExpTime = () => {
  if (!localStorage.getItem('refreshToken')) return 'NoToken';
  const expTime = parseFloat(
    JSON.stringify(localStorage.getItem('tokenExpTime'))
  );
  if (expTime < Date.now() / 1000) {
    reAccessApi;
  }
  return 'SUCCESS';
};

// 로그인 요청 성공 시 엑세스 토큰 헤더에 넣고 리프레쉬 토큰 로컬 스토리지에 저장
const onSuccessLogin = (response: AxiosResponse<tokenType>) => {
  const { accessToken, refreshToken } = response.data;
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('tokenExpTime', `${Date.now() / 1000 + 59 * 60 * 24}`);
  return accessToken;
};

// AccessToken이 없을 때,(만료됐을 때 재발급)
const onNewAccessToken = (response: AxiosResponse<newTokenType>) => {
  const { accessToken } = response.data;
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  console.log('AccessToken 재발급');
};

const loginApi = async (formData: FormData) => {
  // 유저 로그인 요청
  // fullfiled 로그인 성공, 토큰들 반환
  // rejected 에러 발생, status 401
  if (checkTokenExpTime() == 'SUCCESS') {
    return 'alreadyToken';
  }
  let response = 'SUCCESS';
  await api
    .post('/fusers/login', formData)
    .then((res: AxiosResponse<tokenType>) => {
      response = onSuccessLogin(res)
    })
    .catch((error) => {
      console.log(error);
      response = 'FAIL';
    });

  return response;
};

// 로그아웃 요청, 헤더의 Authorization과 로컬 스토리지 비우기
const logoutApi = async () => {
  await api
    .post('/fusers/logout')
    .then()
    .catch((error) => console.log(error));

  axios.defaults.headers.common['Authorization'] = '';
  localStorage.clear();
};

// 회원가입 API
const signUpApi = async (formData: FormData) => {
  if (checkTokenExpTime() == 'SUCCESS') {
    return 'alreadyToken';
  }
  const response = await api
    .post('/fusers/register', formData)
    .then()
    .catch((error) => console.log(error));

  return response;
};

// 토큰 재발행 요청, 리프레쉬 토큰을 보내 엑세스 토큰 받아오기
const reAccessApi = async () => {
  const refreshToken = JSON.stringify(localStorage.getItem('refreshToken'));

  await api
    .post('/jwt/new-access-token', refreshToken)
    .then(onNewAccessToken)
    .catch((error) => console.log(error));
};

// 유저 이메일 중복검사
const verifyEmail = async (email: string) => {
  axios.defaults.headers.common['Authorization'] = ``;
  let result = true;
  await api
    .post('/fusers/check-email', JSON.stringify({ email }), {
      headers: {
        'Access-Controll-Allow-Origin':"*",
        'Content-Type': 'application/json',
      },
    })
    .then((response: AxiosResponse<checkEmailType>) => {
      const { exist } = response.data;
      result = exist;
    })
    .catch((error) => console.log(error));
  return !result;
};

// 관리자 이메일 중복검사
const adminVerifyEmail = async (email: string) => {
  axios.defaults.headers.common['Authorization'] = ``;
  let result = true;
  await api
    .post('/fusers/check-email', JSON.stringify({ email }), {
      headers: {
        'Access-Controll-Allow-Origin':"*",
        'Content-Type': 'application/json',
      },
    })
    .then((response: AxiosResponse<checkEmailType>) => {
      const { exist } = response.data;
      result = exist;
    })
    .catch((error) => console.log(error));
  return !result;
};

const adminLoginApi = async (formData: FormData) => {
  // 관리자 로그인 요청
  // fullfiled 로그인 성공, 토큰들 반환
  // rejected 에러 발생, status 401
  if (checkTokenExpTime() == 'SUCCESS') {
    return 'alreadyToken';
  }
  let response = 'SUCCESS';
  await api
    .post('/pusers/login', formData)
    .then(onSuccessLogin)
    .catch((error) => {
      console.log(error);
      response = 'FAIL';
    });

  return response;
};

// 관리자 회원가입 요청
const adminSignUpApi = async (formData: FormData) => {
  if (checkTokenExpTime() == 'SUCCESS') {
    return 'alreadyToken';
  }
  const response = await api
    .post('/pusers/register', formData)
    .then()
    .catch((error) => console.log(error));

  return response;
};

export {
  onSuccessLogin,
  loginApi,
  logoutApi,
  reAccessApi,
  signUpApi,
  verifyEmail,
  adminVerifyEmail,
  adminLoginApi,
  adminSignUpApi,
  checkTokenExpTime,
};
