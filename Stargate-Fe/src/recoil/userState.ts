import { atom, selector } from 'recoil';

interface userStateType {
  refreshToken: string;
  expTime: string;
}

export const tokenState = atom<userStateType>({
  key: 'tokenState',
  default: { refreshToken: '', expTime: '' },
});

export const tokenSelector = selector({
  key: 'tokenSelector',
  get: ({ get }) => get(tokenState),
  set: ({ set }, newToken) => set(tokenState, newToken),
})

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
})