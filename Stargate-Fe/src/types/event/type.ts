export interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

export interface MeetingFUser {
  email: string;
  orderNum: number;
  isRegister: boolean;
  name: string;
}

export interface MeetingMember {
  memberNo: number;
  name: string;
  orderNum: number;
  roomId: string;
}

export interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  groupNo: number;
  groupName: string;
  imageFileInfo?: ImageFileInfo;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}
