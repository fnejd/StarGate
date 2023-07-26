import React from 'react';
import AdminBoardHeaderNav from '../../../atoms/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/AdminManagementModal';

const dummy = {
  유한스: {
    member1: '이유한',
    member2: '김수환',
    member3: '로그인',
    member4: '회원가입',
  },
  수환없는수환팀: {
    member1: '프론트',
    member2: '제7의멤버',
    member3: '야랩몬스터',
  },
  의찬스: {
    member1: '코틀린',
    member2: '이의찬',
    member3: '김도현',
    member4: '편의점갔다올까',
  },
  RN: {
    member1: '안드로이드스튜디오',
    member2: '이의찬',
    member3: '플러터',
  },
  코틀린: {
    member1: '이유한',
    member2: '딸기타임',
    member3: '플러터',
  },
  도시락vs설렁탕: {
    member1: '설렁탕',
    member2: '도시락',
    member3: '배고파',
  },
  트와이스: {
    member1: '설렁탕',
    member2: '도시락',
    member3: '배고파',
  },
};

/**
 * 	{
		groupNo: 20, // [long] 그룹번호
		name : "406s", // [String] 그룹명
		members: [
			{
				memberNo : 29,    // [long]   멤버번호
				name : "이유한",  // [String]  멤버이름
			},
			{
				memberNo : 30,      // [long]  멤버번호
				name : "이름이름",  // [String] 멤버이름
			},
				...
		]
	},
	...
 * 더미 형식 추후 변경 예정
 */

const AdminManagement = () => {
  return (
    <div className='w-xl h-screen'>
      <AdminBoardHeaderNav />
      <div className='h-4/5 flex flex-col justify-around items-center'>
        <p className='form-title'>소속 연예인 관리</p>
        <div>
          <AdminManagementModal group={dummy} />
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
