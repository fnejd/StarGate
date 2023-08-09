import { atom } from 'recoil';

interface GroupData {
  groupNo: number;
  name: string;
  members: MemberData[];
}

interface MemberData {
  memberNo: number;
  name: string;
}

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