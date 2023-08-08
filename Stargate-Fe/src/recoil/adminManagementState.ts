import { atom, selector } from 'recoil';

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

export const selectedGroupName = selector({
  key: 'selectedGroupName',
  get: ({ get }) => {
    const groups = get(groupsState);
    const selectedGroupNo = get(selectedGroupNoState);
    const group = groups.find((group) => group.groupNo === selectedGroupNo);
    return group?.name || '';
  },
});

export const selectedGroupMembers = selector({
  key: 'selectedGroupMembers',
  get: ({ get }) => {
    const groups = get(groupsState);
    const selectedGroupNo = get(selectedGroupNoState);
    const group = groups.find((group) => group.groupNo === selectedGroupNo);
    return group?.members || [];
  },
});