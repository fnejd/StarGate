import { useState, ChangeEvent } from 'react';
// import { MeetingRightSection } from '@/organisms/MeetingRightSection';

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

interface FormData {
  name: string;
  startDate: Date | String | null; // null로 초기화하여 값을 비워놓을 수 있도록 함
  waitingTime: number;
  meetingTime: number;
  notice: string;
  photoNum: number;
  imageFile: File | null;
  meetingFUsers: MeetingFUser[];
  meetingMembers: MeetingMember[];
}

interface MeetingRightSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const MeetingRightSection = ({
  formData,
  setFormData,
}: MeetingRightSectionProps) => {
  const [textValue, setTextValue] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };

      // formData 업데이트
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageFile: file, // 선택된 파일로 이미지 업데이트
      }));

      reader.readAsDataURL(file);
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log('공지', value);

    setFormData((prevFormData) => ({
      ...prevFormData,
      notice: textValue,
    }));
  };

  return (
    <>
      <div className="w-48 h-8">
        <div className="mb-6">
          <div className="flex w-48 mx-1 my-2 font-medium text-white font-suit text-14">
            대표사진
          </div>
          <button
            onClick={() => document.getElementById('fileInput')?.click()} // 파일 선택 버튼 클릭 시 input 클릭 이벤트 호출
            className="w-20 h-8 mb-2 font-medium text-black rounded-sm text-12 bg-admingray font-suit"
          >
            파일 선택
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />
          {selectedImage && (
            <div>
              <img
                src={selectedImage}
                alt="미리보기"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          )}
        </div>
        <div className="flex w-48 mx-1 my-2 font-medium text-white font-suit text-14">
          공지사항
        </div>
        <textarea
          id="myTextarea"
          value={textValue}
          onChange={handleTextareaChange}
          onBlur={handleBlur}
          placeholder="대기화면에 띄워질 공지를 작성해주세요"
          className="px-3 py-2 ml-1 text-black bg-white border border-gray-300 rounded-sm w-400 h-350 text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
        />
      </div>
    </>
  );
};

export default MeetingRightSection;
