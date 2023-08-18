import { atom } from 'recoil';
import { GroupData, MemberData } from '@/types/board/type';

/**
 * 그룹&멤버 변화 일어날때마다 다시 groups fetch하기 위한 추적용 변수
 */
export const groupsShouldFetch = atom<boolean>({
  key: 'groupsShouldFetch',
  default: true,
});

export const groupsDeleteState = atom<boolean>({
  key: 'groupsDeleteState',
  default: false,
});

export const groupsState = atom<GroupData[]>({
  key: 'groupsState',
  default: [],
});

export const selectedGroupNoState = atom<number | null>({
  key: 'selectedGroupNoState',
  default: null,
});

export const selectedGroupNameState = atom<string>({
  key: 'selectedGroupNameState',
  default: '',
});

export const selectedGroupMembersState = atom<MemberData[]>({
  key: 'selectedGroupMembersState',
  default: [],
});