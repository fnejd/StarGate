import { MeetingData } from '@/types/event/type';

const MeetingBottomDetail = ({ formData }: { formData: MeetingData }) => {
  return (
    <div className="w-full flex flex-col items-start font-medium text-white font-suit text-14">
      <div className="flex text-16 font-semibold">유저</div>
      <table>
        <tbody>
          <tr>
            <td>이름</td>
            <td>이메일</td>
            <td>회원가입 여부</td>
          </tr>
          {formData.meetingFUsers.map((fUser, index) => (
            <tr key={index}>
              <td>{fUser.name}</td>
              <td>{fUser.email}</td>
              <td className={`material-symbols-rounded flex justify-center ${fUser.isRegister ? `text-green` : `text-red`}`}>
                {fUser.isRegister ? `Done` : `Close`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingBottomDetail;
