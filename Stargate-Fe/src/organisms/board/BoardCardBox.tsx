import BoardCard from '../../atoms/board/BoardCard';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
  const [stringDate, setStringDate] = useState('');

  useEffect(() => {
    if (date !== undefined) {
      const start = date;
      const [year, month, dayWithTime] = start.split('-');
      const [day, time] = dayWithTime.split('T'); // "T"를 기준으로 분리하여 일자와 시간을 추출
      const [hour, minute, second] = time.split(':');
      const newDate: Date = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
        Number(second.split('.')[0])
      );
      const formattedDate = `${year}-${month}-${day}  ${newDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${newDate.getMinutes().toString().padStart(2, '0')}`;
      setStringDate(formattedDate);
    }
  }, [date]);

  const navigate = useNavigate();

  const handleToReady = () => {
    if (remainingTime <= 1800) {
      navigate(`/ready/${uuid}`);
    }
  };
  const handleToDetail = () => {
    navigate(`/admin/event/detail/${uuid}`);
  };
  /**
   * isTimeExceeded가 1800초 초과라면
   * 색깔 회색 + 사용 불가로 막아놓음
   */
  const isTimeExceeded = !isAdmin ? remainingTime > 1800 : false;
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
        <div className="w-5/6 lg:h-96 md:h-56 sm:h-56 flex justify-center items-center bg-opacity-50 bg-white shadow-custom border border-custom backdrop-filter-blur animate-pulse rounded-lg">
          <div className="w-5/6 h-5/6 flex justify-center items-center">
            <BoardCard isLoading={isLoading} />
            <div className="h-3/4 flex flex-col flex-grow justify-evenly ml-12">
              <h1>제목</h1>
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <div className="flex justify-between mb-2">
                    <p className="h3b">일시</p>
                    <p className="h3r">{stringDate}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="h3b">남은시간</p>
                    <p className="h3r">
                      {days > 0 && `${days}일 `}
                      {hours > 0 && `${hours}시간 `}
                      {minutes > 0 && `${minutes}분 `}
                      {seconds > 0 && `${seconds}초`}
                    </p>
                  </div>
                </div>
                <div className="w-2/3 flex justify-end p2b">
                  {isAdmin ? (
                    <button
                      onClick={handleToDetail}
                      className={isTimeExceeded ? 'medium-gray' : 'medium-blue'}
                      disabled={isTimeExceeded}
                    >
                      상세보기
                    </button>
                  ) : (
                    <button
                      onClick={handleToReady}
                      className={isTimeExceeded ? 'medium-gray' : 'medium-blue'}
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
        <div className="w-5/6 lg:h-96 md:h-56 sm:h-56 flex justify-center items-center bg-opacity-50 bg-white shadow-custom border border-custom backdrop-filter-blur rounded-lg">
          <div className="w-5/6 h-5/6 flex justify-center items-center">
            <BoardCard imageSrc={imageSrc} isLoading={isLoading} />
            <div className="h-3/4 flex flex-col flex-grow justify-evenly ml-12">
              <h1>{title}</h1>
              <div className="flex">
                <div className="flex flex-col w-1/2">
                  <div className="flex justify-between mb-2">
                    <p className="h3b">일시</p>
                    <p className="h3r">{stringDate}</p>
                  </div>
                  {isOngoing ? (
                    <div className="flex justify-between">
                      <p className="h3b">진행중입니다!</p>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <p className="h3b">남은시간</p>
                      <p className="h3r">
                        {days > 0 && `${days}일 `}
                        {hours > 0 && `${hours}시간 `}
                        {minutes > 0 && `${minutes}분 `}
                        {seconds > 0 && `${seconds}초`}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-2/3 flex justify-end p2b">
                  {isAdmin ? (
                    <button
                      onClick={handleToDetail}
                      className={isTimeExceeded ? 'medium-gray' : 'medium-blue'}
                      disabled={isTimeExceeded}
                    >
                      상세보기
                    </button>
                  ) : (
                    <button
                      onClick={handleToReady}
                      className={isTimeExceeded ? 'medium-gray' : 'medium-blue'}
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