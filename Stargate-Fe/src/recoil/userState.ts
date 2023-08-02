import { atom } from 'recoil';

interface userStateType {
  token: string;
  email: string;
}

export const userState = atom<userStateType>({
  key: 'userState',
  default: { token: 'hi', email: '' },
});

export const tokenState = atom<string>({
  key: 'tokenState',
  default: ''
})