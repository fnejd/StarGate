export interface GroupData {
  groupNo: number;
  name: string;
  members: MemberData[];
}
export interface MemberData {
  memberNo: number;
  name: string;
}
/**
 * @param ongoing => 진행중
 * @param expected => 예정
 * @param finished => 완료
 */

export interface BoardData {
  ongoing: MeetingData[];
  expected: MeetingData[];
  finished: MeetingData[];
}
/**
 * @param uuid => 미팅 구분할 uuid
 * @param remainingTime => 남은 시간(초)
 * @param imageFileInfo => 이미지 정보
 */
export interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  remainingTime: number;
  imageFileInfo?: ImageFileInfo;
}
export interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

export interface UserData {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birthday: string;
  phone: string;
}

export interface AdminData {
  name: string;
  email: string;
  code: string;
}

export interface MeetingMember {
  memberNo: number;
  name: string;
  polaroids: Polaroid[];
  letter: FanLetter;
}
export interface FanLetter {
  no: number;
  contents: string;
  createDate: string;
  editDate: string;
}

export interface Polaroid {
  no: number;
  imageFileInfo: ImageFileInfo;
}
