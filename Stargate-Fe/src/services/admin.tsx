import { AxiosResponse } from 'axios';
import { api } from './api';

// interface tokenType {
//   accessToken: string;
//   refreshToken: string;
// }

// interface newTokenType {
//   accessToken: string;
// }

// interface checkEmailType {
//   exist: boolean;
// }

// interface idInquiryType {
//   email: string;
//   name: string;
//   phone: string;
// }

// interface pwInquiryType {
//   email: string;
//   code: string;
// }

// /**
//  * @COMMONAREA
//  */
// // 토큰 만료시간 체크 메서드
// // Back으로 넘어가는 API 호출 최대한 줄이게 API 호출 전에 만료여부 체크
// const checkTokenExpTime = async () => {
//   if (!sessionStorage.getItem('refreshToken')) {
//     if (!localStorage.getItem('refreshToken')) return 'NoToken';
//   }
//   const expTime = parseFloat(
//     JSON.stringify(
//       sessionStorage.getItem('tokenExpTime') != null
//         ? sessionStorage.getItem('tokenExpTime')
//         : localStorage.getItem('tokenExpTime')
//     )
//   );
//   if (expTime < Date.now() / 1000) {
//     await reAccessApi();
//   }
//   return 'SUCCESS';
// };

// /**
//  * @USERAREA
//  */
// // 로그인 요청 성공 시 엑세스 토큰 헤더에 넣고 리프레쉬 토큰 스토리지에 저장
// const onSuccessLogin = (response: AxiosResponse<tokenType>, type: boolean) => {
//   const { accessToken, refreshToken } = response.data;
//   console.log(accessToken);
//   api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

//   const expTime = Date.now() / 1000 + 59 * 60 * 24;

//   if (type) {
//     localStorage.setItem('refreshToken', refreshToken);
//     localStorage.setItem('tokenExpTime', `${expTime}`);
//   }

//   sessionStorage.setItem('refreshToken', refreshToken);
//   sessionStorage.setItem('tokenExpTime', `${expTime}`);

//   return accessToken;
// };

// // AccessToken이 없을 때,(만료됐을 때 재발급)
// const onNewAccessToken = (response: AxiosResponse<newTokenType>) => {
//   const { accessToken } = response.data;
//   api.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
//   console.log('AccessToken 재발급');

//   const expTime = Date.now() / 1000 + 59 * 60 * 24;

//   if (localStorage.getItem('tokenExpTime') != null) {
//     localStorage.setItem('tokenExpTime', `${expTime}`);
//   }
//   if (sessionStorage.getItem('tokenExpTime') != null) {
//     sessionStorage.setItem('tokenExpTime', `${expTime}`);
//   }
// };

// 미팅 상세정보 불러오기
const getEvent = async () => {
  await api
    .get('/meetings/get/46a972b0-b629-4360-af01-d5dcd88f8286')
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

  //   return response;
};

export { getEvent };
