import { useState, useEffect } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import CSVReader from 'react-csv-reader';
import AdminBtn from '@/atoms/common/AdminBtn';
import AdminInput from '@/atoms/event/AdminInput';
import DropDown from '@/atoms/event/DropDown';

interface MeetingFUser {
  no: number;
  email: string;
  orderNum: number;
  isRegister: string;
  name: string;
}

interface MeetingMember {
  no: number;
  memberNo: number;
  orderNum: number;
  roomId: string;
}

interface Members {
  memberNo: number;
  name: string;
}

interface FormData {
  name: string;
  startDate: Date | null; // null로 초기화하여 값을 비워놓을 수 있도록 함
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  imageFile: File | null;
  meetingFUsers: string;
  meetingMembers: string;
}

interface Member {
  memberNo: number;
  name: string;
}

interface Group {
  groupNo: number;
  name: string;
  members: Member[];
}

interface MeetingBottomSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  group: Group[];
  setGroup: React.Dispatch<React.SetStateAction<Group>>;
}

const MeetingBottomDetail = ({
  formData,
  setFormData,
  group,
  setGroup,
}: MeetingBottomSectionProps) => {
  const [starValue, setStarValue] = useState('');
  const [memberValue, setMemberValue] = useState('');
  const [watingtimeValue, setWatingtimeValue] = useState('');
  const [fanValue, setFanValue] = useState('');
  const [members, setMembers] = useState<Members[]>([]);
  const [fanData, setFanData] = useState([]);

  console.log('바텀에서 그룹', group);

  // group 데이터가 변경되면 그룹의 멤버도 변경
  useEffect(() => {
    if (group && group.length > 0) {
      setMembers(group[0].members);
      console.log('첫번째 그룹과 멤버로 폼데이터 디폴트 값 지정');
    }
  }, [group]);

  const handleStarvalue = (value: string) => {
    setStarValue(value);
    console.log(`연예인은 ${starValue}`);
  };

  const handleMembervalue = (value: string) => {
    setMemberValue(value);
    console.log(`멤버는 ${memberValue}`);
    console.log(formData.meetingMembers);
  };

  const handleWatingtime = (value: string) => {
    setWatingtimeValue(value);
    console.log(`대기시간은 ${watingtimeValue}`);

    setFormData((prevFormData) => ({
      ...prevFormData,
      waitingTime: Number(value),
    }));
  };

  const handleFanValue = (value: string) => {
    setFanValue(value);
    console.log(`입력값 ${fanValue}`);
  };

  // 등록 함수
  const handleGroupChange = (value: number | string) => {
    const selectedGroup = group.find((item) => item.name === value);
    if (selectedGroup) {
      setMembers(selectedGroup.members);
    }
  };
  
  // 멤버 변수가 바뀌변 폼데이터 업데이트
  useEffect(() => {
    setFormData((prevFormData) => {
      const updatedMembers = [...prevFormData.meetingMembers, ...members];
      console.log(updatedMembers);
      
      return {
        ...prevFormData,
        meetingMembers: updatedMembers,
      };
    });
  }, [members]);

    // 팬 변수가 바뀌면 폼데이터 업데이트
    useEffect(() => {
      setFormData((prevFormData) => {
        const updatedFans = [...prevFormData.meetingFUsers, ...fanData];
        console.log(updatedFans);
        
        return {
          ...prevFormData,
          meetingFUsers: updatedFans,
        };
      });
    }, [fanData]);

  const addFans = (email: string) => {
    if (email.trim() !== '') { // 빈 문자열이 아닌 경우에만 추가
      setFanData([email, ...fanData]);
      setFanValue('');
    }
  };

  const handleCsvData = (data, fileInfo) => {
    // 2열(인덱스 1)에 있는 이메일 값들을 추출하여 emailList에 저장
    const emails = data.slice(1).map((row) => row[1]);
    // 빈 값이 아닌 것들만 필터링하여 저장
    const nonEmptyEmails = emails.filter(
      (email) => email && email.trim() !== ''
    );
    console.log('nonEmptyEmails', nonEmptyEmails);
    setFanData([...nonEmptyEmails, ...fanData]);
  };

  console.log('팬 데이터 업로드', fanData);

  console.log(formData.meetingFUsers);

  const deleteMember = (index: number) => {
    setFormData((prevFormData) => {
      const updatedMembers = [...prevFormData.meetingMembers];
      updatedMembers.splice(index, 1);
      return { ...prevFormData, members: updatedMembers };
    });
  };

  const deleteFan = (index: number) => {
    setFanData((prevFandata) => {
      const updatedFans = [...prevFandata];
      updatedFans.splice(index, 1);
      return updatedFans;
    });
  };

  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const handleDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;

    // 깊은 복사
    const _items = JSON.parse(JSON.stringify(members)) as typeof members;
    console.log('깊은복사', _items);
    // 기존 아이템 뽑아내기
    const [targetItem] = _items.splice(source.index, 1);
    console.log('기존아이템', targetItem);
    // 기존 아이템을 새로운 위치에 삽입하기
    _items.splice(destination.index, 0, targetItem);
    // 상태 변경
    setMembers(_items);
  };

  console.log('아이템##############', members);

  return (
    <div className="w-550">
      {/* 연예인명 추가 */}
      <div className="flex flex-col items-start">
        {/* <div className="flex h-8"> */}
        <div className="flex mx-1 my-2 font-medium text-white font-suit text-14">
          그룹 / 솔로명
        </div>
        {/* </div> */}
        {group && (
          <DropDown
            options={group.map((item) => item.name)}
            onOptionChange={handleGroupChange}
          />
        )}
      </div>
      {/* 멤버명 추가 */}
      <div className="flex h-8">
        <div className="flex mx-1 my-2 font-medium text-white font-suit text-14">
          멤버명
        </div>
        <p className="ml-1 leading-9 input-warning">
          팬사인회 순서는 위에서부터 아래로 진행됩니다
        </p>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              // style={{ background: snapshot.isDraggingOver ? 'red' : 'blue' }}
              className="flex flex-col items-start justify-between w-52"
            >
              {members &&
                members.map((item, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // key={index}
                        className="flex items-center justify-between mt-2 w-62"
                      >
                        <div className="mx-1 my-2 font-medium text-left text-white font-suit text-14">
                          {index + 1} 번
                        </div>
                        <div className="mx-1 my-2 font-medium text-left text-white font-suit text-14">
                          {item.name}
                        </div>
                        {/* <AdminBtn
                          text="삭제"
                          onClick={() => deleteMember(index)}
                        /> */}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* 멤버가 다수일 경우 다음 통화까지 대기시간 설정 가능 */}
      {formData.meetingMembers.length >= 1 && (
        <div className="flex items-end">
          <AdminInput
            labelFor="다음 통화까지 대기시간 (초)"
            type="number"
            placeholder="10"
            min="5"
            max="60"
            step="5"
            value={watingtimeValue}
            onInputChange={handleWatingtime}
          >
            {' '}
            {/* <AdminBtn
              text="등록"
              onClick={() => addWatingtime(watingtimeValue)}
            /> */}
          </AdminInput>
          {/* <p className="p-1 pl-2 font-medium text-white font-suit text-14">
            초
          </p> */}
        </div>
      )}
      {/* 참가자 추가 */}
      <div className="flex flex-col items-start">
        <div className="flex">
          <AdminInput
            labelFor="참가자 등록"
            type="text"
            onInputChange={handleFanValue}
            value={fanValue}
            placeholder="stargate@gmail.com"
          >
            <AdminBtn text="등록" onClick={() => addFans(fanValue)} />
          </AdminInput>
          <div className="relative inline-block w-32 h-8 cursor-pointer top-9">
            <CSVReader
              cssClass="csv-btn"
              label="CSV 파일 불러오기"
              onFileLoaded={handleCsvData}
            />
            <div className="w-32 h-8 font-medium leading-8 text-center text-black rounded-sm text-12 bg-admingray font-suit">
              CSV 파일 불러오기
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between w-52">
          {fanData.map(
            (item, index) =>
              item && (
                <div
                  key={index}
                  className="flex items-center justify-between mt-2 w-62"
                >
                  <div className="mx-1 my-2 font-medium text-left text-white font-suit text-14">
                    {item}
                  </div>
                  <AdminBtn text="삭제" onClick={() => deleteFan(index)} />
                </div>
              )
          )}
        </div>
      </div>

      {/* <div className="mx-1 my-2 font-medium text-left text-white font-suit text-14">
        총 미팅 시간은 분 초 입니다
      </div> */}
    </div>
  );
};

export default MeetingBottomDetail;
