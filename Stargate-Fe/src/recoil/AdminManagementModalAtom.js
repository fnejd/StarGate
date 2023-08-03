import { atom, selector } from 'recoil';

/**
 * recoil
 * atom : key랑 default값이 필수, key는 호출할때 부르는 값 / default는 기본값
 * selector : key랑 get값이 필수, key는 호출할때 부르는 값 / get으로 가져와서 조작 후 return
 * 전역으로 useState 쓰는 것과 흡사, 당연히 key값이 겹치면 안됨.
 * 아래는 예시코드.
 */

export const CartAtom = atom({
  key: 'CartAtom',
  default: [],
});

export const QuantitySelector = selector({
  key: 'QuantitySelector',
  get: ({ get }) => {
    const CurrentItem = get(CartAtom);
    return CurrentItem.length.toLocaleString();
  },
});
