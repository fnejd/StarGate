import { atom } from 'recoil';

export const emailState = atom<string>({
  key: 'emailState',
  default: '',
});
