import { useNavigate } from 'react-router-dom';
import { useSocket } from '@/context/SocketProvider';

const ReadyRoom = () => {
  // // 유저가 탭에 있는 내용 순서대로 다 작성했을 경우,
  // // 마지막 탭을 띄워놓는다
  // // 그 상황에서 남은 시간이 5초 전일경우
  // // 훅 함수가 실행되면서 1초 씩 확인하다가 정확한 시간이 되었을 때,
  // // 소켓으로 방 입장 이벤트 전송

  // const [email, setEmail] = useState<string>(''); // 사용자 이메일을 담는 상태 변수
  // const [room, setRoom] = useState<string>(''); // 방 번호를 담는 상태 변수
  // const [timeLeft, setTimeLeft] = useState(30 * 60); // 주어진 시간을 초로 설정 (30분 * 60초)
  // const navigate = useNavigate();

  // const socket = useSocket(); // SocketProvider로부터 소켓 객체 가져오기
  // const navigate = useNavigate(); // React Router의 navigate 함수 가져오기

  // // 서버에서 받아오는 미팅방 uuid
  // const socketUUID = '09ed6064-77ab-460c-92f0-27aebc370e80.1';

  // ////////////////////// 남은 시간 계산 /////////////////////////////////
  // // 남은 시간을 분과 초로 변환 (이거 이제 서버에서 받아옴)
  // // "startDate": "2023-07-19T03:46:22.904", // [String] 미팅 시작 시간
  // const tempTime = '2023-07-19T03:46:22.904';

  // const targetTime = new Date(tempTime);
  // const currentTime = new Date();
  // const timeDiff = targetTime - currentTime;

  // const minutesLeft = Math.floor(timeDiff / (1000 * 60));
  // const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

  // console.log(`현재로부터 ${minutesLeft}분 ${secondsLeft}초 남았습니다.`);

  // //////////////////////// 타이머 구현 ////////////////////////////////////
  // function Counter() {
  //   const [count, setCount] = useState(5);

  //   useEffect(() => {
  //     const id = setInterval(() => {
  //       setCount((count) => count - 1);
  //     }, 1000);
  //     if (count === 0) {
  //       clearInterval(id);
  //     }
  //     return () => clearInterval(id);
  //   }, [count]);

  //   return <h1>{count}</h1>;
  // }

  // ////////////////////// 남은 시간이 5초가 되면 타이머 카운팅 + 디비 저장 /////////////////////////////////

  // const handleJoinRoom = useCallback(
  //   (data: { email: string; room: string }) => {
  //     const { email, room } = data; // 서버에서 전달된 이메일과 방 번호 가져오기
  //     navigate(`/room/${room}`); // 해당 방으로 이동하기 위해 navigate 함수 호출
  //   },
  //   [navigate] // navigate 함수가 변경될 때마다 함수 재생성
  // );

  // if (minutesLeft == 0 && secondsLeft <= 5) {
  //   // 타이머 컴포넌트 띄우기
  //   // 타이머 빨간색 + 5부터 카운팅 변수 프롭스로 전달
  //   // 디비 저장
  // } else if (minutesLeft == 0 && secondsLeft == 0) {
  //   // 비디오콜 입장
  // } else {
  // }

  // // const joinVideo = useCallback(
  // //   socket.emit('room:join', { email, room }); // 서버로 "room:join" 이벤트와 함께 이메일과 방 번호를 전송
  // //   [email, room, socket] // 이메일, 방 번호, 소켓 객체가 변경될 때마다 함수 재생성
  // // );

  // const handleJoinRoom = useCallback(
  //   (data: { email: string; room: string }) => {
  //     const { email, room } = data; // 서버에서 전달된 이메일과 방 번호 가져오기
  //     navigate(`/room/${room}`); // 해당 방으로 이동하기 위해 navigate 함수 호출
  //   },
  //   [navigate] // navigate 함수가 변경될 때마다 함수 재생성
  // );

  // // 10초 전 알림 처리
  // useEffect(() => {
  //   if (timeLeft <= 10) {
  //     alert('남은 시간이 10초 남았습니다!');
  //   }
  // }, [timeLeft]);

  // // 1초마다 시간 확인 및 업데이트
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prevTime) => prevTime - 1);
  //   }, 1000);

  //   // 컴포넌트가 언마운트되면 타이머 해제
  //   return () => clearInterval(timer);
  // }, []);

  // useEffect(() => {
  //   socket.on('room:join', handleJoinRoom); // "room:join" 이벤트에 대한 리스너 등록
  //   return () => {
  //     socket.off('room:join', handleJoinRoom); // 컴포넌트 언마운트 시 리스너 해제
  //   };
  // }, [socket, handleJoinRoom]); // 소켓 객체와 이벤트 처리 함수가 변경될 때마다 useEffect 재실행

  return <div>대기방</div>;
};

export default ReadyRoom;
