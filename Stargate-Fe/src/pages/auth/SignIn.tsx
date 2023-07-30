import BtnWhite from '@/atoms/BtnWhite.tsx';
import BtnBlue from '@/atoms/BtnBlue.tsx';
import BlackLayer from '@/atoms/BlackLayer.tsx';
import PolariodCard from '@/atoms/PolariodCard.tsx';
import AdminBtn from '@/atoms/AdminBtn.tsx';
import AdminInput from '@/atoms/AdminInput.tsx';
import MeetingLeftSection from '@/organisms/MeetingLeftSection.tsx';
import MeetingRightSection from '@/organisms/MeetingRightSection.tsx';
import MeetingBottomSection from '@/organisms/MeetingBottomSection.tsx';
import RemindTitle from '@/organisms/RemindTitle.tsx';
import RemindDetail from '@/organisms/RemindDetail.tsx';

const SignIn = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };
  const imageUrl = 'https://picsum.photos/900/700';
  const caption = '사진 캡션';
  const label = '라벨';

  return (
    // 임시
    <div className="bg-slate-700">
      {/* <RemindTitle /> */}
      {/* <RemindDetail /> */}
      {/* <BtnWhite text="Click me" onClick={handleClick} />
      <BtnBlue text="Click me" onClick={handleClick} />
      <PolariodCard imageUrl={imageUrl} caption={caption} />
      <AdminBtn text="Click me" onClick={handleClick} />
      <AdminInput labelFor="이름" type="text" placeholder="Enter your name" />
      <BlackLayer /> */}
    </div>
  );
};

export default SignIn;
