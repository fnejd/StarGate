import axios, { AxiosResponse } from 'axios';
import { api } from './api';

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

interface idInquiryType {
  email: string;
  name: string;
  phone: string;
}

interface pwInquiryType {
  email: string;
  code: string;
}

/**
 * @COMMONAREA
 */
// 토큰 만료시간 체크 메서드
// Back으로 넘어가는 API 호출 최대한 줄이게 API 호출 전에 만료여부 체크
const checkTokenExpTime = async () => {
  if (!sessionStorage.getItem('refreshToken')) {
    if (!localStorage.getItem('refreshToken')) return 'NoToken';
  }
  const expTime = parseFloat(
    JSON.stringify(
      sessionStorage.getItem('tokenExpTime') != null
        ? sessionStorage.getItem('tokenExpTime')
        : localStorage.getItem('tokenExpTime')
    )
  );
  // Header나 LocalStorage에 AccessToken이 있다면 True, 없다면 False;
  const flag =
    axios.defaults.headers.common['Authorization'] ||
    localStorage.getItem('accessToken')
      ? true
      : false;
  // 만료시간이 지나지 않았거나 AccessToken이 없다면 재발급 메서드 호출
  if (expTime < Date.now() / 1000 && !flag) {
    await reAccessApi();
  }
  return 'SUCCESS';
};

/**
 * @USERAREA
 */
// 로그인 요청 성공 시 엑세스 토큰 헤더에 넣고 리프레쉬 토큰 스토리지에 저장
const onSuccessLogin = (response: AxiosResponse<tokenType>, type: boolean) => {
  const { accessToken, refreshToken } = response.data;
  console.log(accessToken);
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const expTime = Date.now() / 1000 + 59 * 60 * 24;

  localStorage.setItem('accessToken', accessToken);

  if (type) {
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('tokenExpTime', `${expTime}`);
  }

  sessionStorage.setItem('refreshToken', refreshToken);
  sessionStorage.setItem('tokenExpTime', `${expTime}`);

  return accessToken;
};

// AccessToken이 없을 때,(만료됐을 때 재발급)
const onNewAccessToken = (response: AxiosResponse<newTokenType>) => {
  const { accessToken } = response.data;
  api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  console.log('AccessToken 재발급');

  const expTime = Date.now() / 1000 + 59 * 60 * 24;

  if (localStorage.getItem('tokenExpTime') != null) {
    localStorage.setItem('tokenExpTime', `${expTime}`);
  }
  if (sessionStorage.getItem('tokenExpTime') != null) {
    sessionStorage.setItem('tokenExpTime', `${expTime}`);
  }
};

const loginApi = async (formData: FormData, type: boolean) => {
  // 유저 로그인 요청
  if ((await checkTokenExpTime()) == 'SUCCESS') {
    return 'alreadyToken';
  }
  let response = 'SUCCESS';
  await api
    .post('/fusers/login', formData, {
      withCredentials: false,
    })
    .then((res: AxiosResponse<tokenType>) => {
      response = res.status == 200 ? onSuccessLogin(res, type) : 'FAIL';
    })
    .catch((error) => {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      response = error['response'].status.toString();
    });

  return response;
};

// 로그아웃 요청, 헤더의 Authorization과 로컬 스토리지 비우기
// 토큰 값 base64로 디코드
// auth 값이 유저가 아닌 경우 (관리자인 경우)
// api 요청 보내지 않기.!
const logoutApi = async () => {
  await checkTokenExpTime();
  try {
    let result;
    // if (api.defaults.headers.common['Authorization'] != null) {
    //   const tokenDecode = api.defaults.headers.common['Authorization']
    //     ?.toString()
    //     .split('.')[1];
    //   const payload = atob(tokenDecode);
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   result = JSON.parse(payload.toString());
    // }
    if (localStorage.getItem('accessToken') != null) {
      const tokenDecode = localStorage
        .getItem('accessToken')
        ?.toString()
        .split('.');
      if (tokenDecode != undefined && tokenDecode.length > 0) {
        const payload = atob(tokenDecode[1]);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result = JSON.parse(payload.toString());
        console.log(result);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (result.auth && result.auth == 'USER') {
      await api.post(
        '/fusers/logout',
        {},
        {
          headers: {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          withCredentials: false,
        }
      );
    }
    api.defaults.headers.common['Authorization'] = '';
    localStorage.clear();
    sessionStorage.clear();
    return 'SUCCESS';
  } catch (error) {
    console.log(error);
    return 'FAIL';
  }
};

// 회원가입 API
const signUpApi = async (formData: FormData) => {
  if ((await checkTokenExpTime()) == 'SUCCESS') {
    return 'alreadyToken';
  }
  const response = await api
    .post('/fusers/register', formData, {
      // withCredentials: false,
    })
    .then((response) => console.log(response.status))
    .catch((error) => {
      console.log(error);
      throw new Error('회원가입에 문제가 발생했습니다.');
    });

  return response;
};

// 토큰 재발행 요청, 리프레쉬 토큰을 보내 엑세스 토큰 받아오기
const reAccessApi = async () => {
  const refreshToken = JSON.stringify(
    sessionStorage.getItem('refreshToken') != null
      ? sessionStorage.getItem('refreshToken')
      : localStorage.getItem('refreshToken')
  );

  // await api
  await axios
    .post('/jwt/new-access-token', refreshToken)
    .then(onNewAccessToken)
    .catch((error) => console.log(error));
};

// 유저 이메일 중복검사
const verifyEmail = async (email: string) => {
  let result = true;
  await api
    .post('/fusers/check-email', JSON.stringify({ email }), {
      headers: {
        'Access-Controll-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      // withCredentials: false,
    })
    .then((response: AxiosResponse<checkEmailType>) => {
      const { exist } = response.data;
      result = exist;
    })
    .catch((error) => console.log(error));
  return !result;
};

// 유저 아이디 찾기 => Request 값 이름과 전화번호
const idInquiryApi = async (formData: FormData) => {
  let result = {
    email: '',
    name: '',
    phone: '',
  };
  await api
    .post('/fusers/find-id', formData)
    .then((response: AxiosResponse<idInquiryType>) => {
      result = { ...response.data };
    })
    .catch((error) => {
      console.log(error);
      result = { ...result, email: 'NoData' };
    });
  return result;
};

// 유저 비밀번호 찾기 => Request 값 이메일 하나
// 1. 인증번호 발송 => 백에서 인증번호 생성해서 유저 이메일로 하나 Response로 하나 보내기
const pwInquiryApi = async (email: string) => {
  let result = {
    email: 'NoData',
    code: '',
  };
  await api
    .post('/fusers/get-code', JSON.stringify({ email }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    })
    .then((response: AxiosResponse<pwInquiryType>) => {
      console.log(response);
      result = { ...response.data };
    })
    .catch((error) => console.log(error));
  return result;
};
// 2. 인증번호 입력한거랑 DB에 저장된 인증번호랑 같은 지 검사
const checkAuthNumApi = (email: string, code: string) => {
  let result = 'SUCCESS';

  api
    .post('/fusers/check-code', JSON.stringify({ email, code }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    })
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(error);
      result = 'FAIL';
    });

  return result;
};

// 유저 비밀번호 재설정 API
// => JSON 타입으로 이멜, 비밀번호로 재설정 요청
const pwResetApi = async (email: string, password: string) => {
  let status = 0;
  console.log('service ' + email, password);
  await api
    .post('/fusers/new-pw', JSON.stringify({ email, password }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    })
    .then((res) => {
      status = res.status;
    })
    .catch((err) => console.log(err));
  return status.toString();
};

/**
 * @ADMINAREA
 */
// 관리자 이메일 중복검사
const adminVerifyEmail = async (formData: FormData) => {
  let result = true;
  await api
    .post('/pusers/check-email', formData, {
      headers: {
        'Access-Controll-Allow-Origin': '*',
      },
      withCredentials: false,
    })
    .then((response: AxiosResponse<checkEmailType>) => {
      const { exist } = response.data;
      result = exist;
    })
    .catch((error) => console.log(error));
  return !result;
};

const adminLoginApi = async (formData: FormData, type: boolean) => {
  // 관리자 로그인 요청
  if ((await checkTokenExpTime()) == 'SUCCESS') {
    return 'alreadyToken';
  }
  let response = 'SUCCESS';
  await api
    .post('/pusers/login', formData, {
      withCredentials: false,
    })
    .then((res: AxiosResponse<tokenType>) => {
      response = res.status == 200 ? onSuccessLogin(res, type) : 'FAIL';
    })
    .catch((error) => {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      response = error['response'].status.toString();
    });

  return response;
};

// 관리자 회원가입 요청
const adminSignUpApi = async (formData: FormData) => {
  if ((await checkTokenExpTime()) == 'SUCCESS') {
    return 'alreadyToken';
  }
  const response = await api
    .post('/pusers/register', formData, {
      withCredentials: false,
    })
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
  idInquiryApi,
  pwInquiryApi,
  checkAuthNumApi,
  pwResetApi,
  adminVerifyEmail,
  adminLoginApi,
  adminSignUpApi,
  checkTokenExpTime,
};
