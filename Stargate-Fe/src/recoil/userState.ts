import { atom } from 'recoil';
// import { atom, selector } from 'recoil';

// interface userStateType {
//   refreshToken: string;
//   expTime: string;
// }

/**
 * State에 토큰 넣어서 관리한다면 새로고침이 일어날때마다 토큰 사라지게 됨.
 * 그게 나으려나??
 */
// export const tokenState = atom<userStateType>({
//   key: 'tokenState',
//   default: { refreshToken: '', expTime: '' },
// });

// export const tokenSelector = selector({
//   key: 'tokenSelector',
//   get: ({ get }) => get(tokenState),
//   set: ({ set }, newToken) => set(tokenState, newToken),
// })

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});
