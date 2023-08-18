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
  meetingMembers: (string | number)[];
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

const MeetingBottomSection = ({
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
  const [initial, setInitial] = useState(false);

  // group 데이터가 변경되면 그룹의 멤버도 변경
  useEffect(() => {
    if (group && group.length > 0) {
      setMembers(group[0].members);
    }
  }, [group]);

  useEffect(() => {
    if (
      formData.meetingFUsers != undefined &&
      formData.meetingFUsers.length > 0 &&
      !initial
    ) {
      const arr: [] = [];
      for (let i = 0; i < formData.meetingFUsers.length; i++) {
        arr.push(formData.meetingFUsers[i].email);
      }
      setFanData(arr);
      setInitial(true);
    }
  }, [formData]);

  const handleStarvalue = (value: string) => {
    setStarValue(value);
  };

  const handleMembervalue = (value: string) => {
    setMemberValue(value);
  };

  const handleWatingtime = (value: string) => {
    setWatingtimeValue(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      waitingTime: Number(value),
    }));
  };

  const handleFanValue = (value: string) => {
    setFanValue(value);
  };

  // const handleForm = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: keyof FormData
  // ) => {
  //   setFormData({ ...formData, [fieldName]: e.target.value });
  // };

  // 등록 함수8
  const handleGroupChange = (value: number | string) => {
    const selectedGroup = group.find((item) => item.name === value);
    if (selectedGroup) {
      setMembers(selectedGroup.members);
    }
  };

  // 멤버 변수가 바뀌변 폼데이터 업데이트
  useEffect(() => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        // 배열 순서 보장을 위한 stringify 처리
        meetingMembers: members.map((member) => member.memberNo),
      };
    });
  }, [members]);

  // 팬 변수가 바뀌면 폼데이터 업데이트
  useEffect(() => {
    setFormData((prevFormData) => {
      const updatedFans = [...fanData];
      return {
        ...prevFormData,
        meetingFUsers: updatedFans,
      };
    });
  }, [fanData]);

  // const handleMemberChange = (value: number | string) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     meetingMembers: [
  //       ...prevFormData.meetingMembers,
  //       {
  //         memberNo: Number(value), // 매개변수 value를 number 타입으로 변환하여 사용
  //         name: '유한', // 멤버 번호 설정
  //         orderNum: prevFormData.meetingMembers.length + 1, // 멤버 순서 설정
  //         roomId: 2374324, // 회의 방 번호 설정 (임의의 값)
  //       },
  //     ],
  //   }));
  // };

  // const addMember = (name: string) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     members: [...prevFormData.meetingMembers, name],
  //   }));
  //   setMemberValue('');
  // };

  const addFans = (email: string) => {
    if (email.trim() !== '') {
      // 공백 제거
      const emailValue: string = email.trim();
      // 중복 체크
      if (!fanData.includes(emailValue)) {
        const updateFanData = [...fanData];
        updateFanData.push(emailValue);
        setFanData(updateFanData);
        setFanValue('');
      } else {
        // 이미 존재하는 이메일인 경우 처리
        alert('이미 존재하는 이메일입니다.');
      }
    }
  };

  const handleCsvData = (data, fileInfo) => {
    // 2열(인덱스 1)에 있는 이메일 값들을 추출하여 emailList에 저장
    const emails = data.slice(1).map((row) => row[1]);
    // 빈 값이 아닌 것들만 필터링하여 저장
    const nonEmptyEmails = emails.filter(
      (email) => email && email.trim() !== ''
    );
    setFanData([...nonEmptyEmails]);
  };

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
    // 기존 아이템 뽑아내기
    const [targetItem] = _items.splice(source.index, 1);
    // 기존 아이템을 새로운 위치에 삽입하기
    _items.splice(destination.index, 0, targetItem);
    // 상태 변경
    setMembers(_items);
  };

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

export default MeetingBottomSection;
