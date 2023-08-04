import SignInComponent from '@/organisms/auth/SignInComponent';
import ToolTipComponent from '@/atoms/auth/ToolTipComponent';

/**
 * @todo
 * Toggle 버튼 하나 만들어서 로그인 API 요청할 때
 * 관리자 로그인인지 유저 로그인인지 구분 가능토록
 */
const SignIn = () => {
  return (
    <div className="w-screen">
      <div className="ml-auto mr-auto">
        {/* <div className="flex max-w-md m-5 t2b text-white text-center">
          <h1 className="w-1/10">S</h1>
          <h1>T</h1>
          <h1>A</h1>
          <h1>R</h1>
          <h1>G</h1>
          <h1>A</h1>
          <h1>T</h1>
          <h1>E</h1>
        </div> */}
        <h1 className="t2b text-white m-5 text-center">S T A R G A T E</h1>
        <SignInComponent />
        <div className="text-right mr-20 mt-20">
          <ToolTipComponent />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
