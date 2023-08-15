import { atom } from 'recoil';

export const nameShouldFetch = atom<boolean>({
  key: 'nameShouldFetch',
  default: true,
});