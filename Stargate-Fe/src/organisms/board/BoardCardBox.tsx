import BoardCard from '../../atoms/board/BoardCard';
import { useNavigate } from 'react-router-dom';

/**
 * BoardCardBoxProps
 * @param uuid => 미팅에 부여되는 고유 번호
 * @param imageSrc => 이미지 api 주소
 * @param title => Box 측면에서 보여줄 사인회 제목
 * @param date => Box 측면에서 보여줄 사인회 날짜
 * @param remainingTime => Box 측면에서 보여줄 남은 시간
 * @param isAdmin => admin 여부에 따라 확인 후 버튼 이름 변경
 */

interface BoardCardBoxProps {
  uuid?: string;
  imageSrc?: string;
  title?: string;
  date?: string;
  remainingTime?: number;
  isAdmin?: boolean;
  isLoading: boolean;
}

const BoardCardBox = ({
  uuid,
  imageSrc,
  title,
  date,
  remainingTime = 0,
  isAdmin,
  isLoading,
}: BoardCardBoxProps) => {
  const navigate = useNavigate();

  const handleToReady = () => {
    if (remainingTime <= 1800) {
      navigate(`/ready/${uuid}`);
    }
  };
  const handleToMonitoring = () => {
    navigate(`/admin/monitoring`);
  };
  /**
   * isTimeExceeded가 1800초 초과라면
   * 색깔 회색 + 사용 불가로 막아놓음
   */
  const isTimeExceeded = remainingTime > 1800;
  const isOngoing = 1 > remainingTime;

  const days = Math.floor(remainingTime / 86400);
  const hours = Math.floor((remainingTime - days * 86400) / 3600);
  const minutes = Math.floor(
    (remainingTime - days * 86400 - hours * 3600) / 60
  );
  const seconds = remainingTime - days * 86400 - hours * 3600 - minutes * 60;

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="w-5/6 lg:h-96 md:h-56 sm:h-56 flex justify-center items-center backdrop-opacity-50 bg-gray-300 rounded-lg">
          <div className="w-5/6 h-5/6 flex justify-center items-center">
            <BoardCard isLoading={isLoading} />
            <div className="h-3/4 flex flex-col flex-grow justify-evenly mx-6">
              <h1>제목</h1>
              <div className="flex">
                <div className="flex flex-col w-1/3">
                  <div className="flex justify-between">
                    <p>일시</p>
                    <p>{date}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>남은시간</p>
                    <p>
                      {days > 0 && `${days}일 `}
                      {hours > 0 && `${hours}시간 `}
                      {minutes > 0 && `${minutes}분 `}
                      {seconds > 0 && `${seconds}초`}
                    </p>
                  </div>
                </div>
                <div className="w-2/3 flex justify-end">
                  {isAdmin ? (
                    <button
                      onClick={handleToMonitoring}
                      className={isTimeExceeded ? 'bg-admingray' : ''}
                      disabled={isTimeExceeded}
                    >
                      상세보기
                    </button>
                  ) : (
                    <button
                      onClick={handleToReady}
                      className={isTimeExceeded ? 'bg-admingray' : ''}
                      disabled={isTimeExceeded}
                    >
                      입장하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-5/6 lg:h-96 md:h-56 sm:h-56 flex justify-center items-center backdrop-opacity-50 bg-blue-500 rounded-lg">
          <div className="w-5/6 h-5/6 flex justify-center items-center">
            <BoardCard imageSrc={imageSrc} isLoading={isLoading} />
            <div className="h-3/4 flex flex-col flex-grow justify-evenly mx-6">
              <h1>{title}</h1>
              <div className="flex">
                <div className="flex flex-col w-1/3">
                  <div className="flex justify-between">
                    <p>일시</p>
                    <p>{date}</p>
                  </div>
                  {isOngoing ? (
                    <div className="flex justify-between">
                      <p>진행중입니다!</p>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <p>남은시간</p>
                      <p>
                        {days > 0 && `${days}일 `}
                        {hours > 0 && `${hours}시간 `}
                        {minutes > 0 && `${minutes}분 `}
                        {seconds > 0 && `${seconds}초`}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-2/3 flex justify-end">
                  {isAdmin ? (
                    <button
                      onClick={handleToMonitoring}
                      className={isTimeExceeded ? 'bg-admingray' : ''}
                      disabled={isTimeExceeded}
                    >
                      상세보기
                    </button>
                  ) : (
                    <button
                      onClick={handleToReady}
                      className={isTimeExceeded ? 'bg-admingray' : ''}
                      disabled={isTimeExceeded}
                    >
                      입장하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCardBox;
