interface ImageFileInfo {
  filename: string;
  fileUrl: string;
}

interface MeetingFUser {
  email: string;
  orderNum: number;
  name: string;
  remainingTime: number;
  remainingFanNum: number;
  memoContents: string;
}

interface MeetingMember {
  memberNo: number;
  name: string;
  orderNum: number;
  roomId: string;
  isPolaroidEnable: boolean;
  postitContents: string;
}

interface MeetingData {
  uuid: string;
  name: string;
  startDate: string;
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  groupNo: number;
  groupName: string;
  imageFileInfo: ImageFileInfo;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}
