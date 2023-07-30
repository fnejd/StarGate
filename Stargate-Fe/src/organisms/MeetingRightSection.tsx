import { useState, ChangeEvent } from 'react';

const MeetingRightSection = () => {
  const [textValue, setTextValue] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  return (
    <>
      <div className="w-48 h-8">
        <div className="mb-6">
          <div className="flex w-48 mx-1 my-2 font-suit font-medium text-14 text-white">
            대표사진
          </div>
          <div>
            <button className="w-20 h-8 text-12 font-medium bg-admingray font-suit text-black rounded-sm">
              <span onChange={handleImageChange}>파일 선택</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </button>
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
        </div>
        <div className="flex w-48 mx-1 my-2 font-suit font-medium text-14 text-white">
          공지사항
        </div>
        <textarea
          id="myTextarea"
          value={textValue}
          onChange={handleTextareaChange}
          placeholder="대기화면에 띄워질 공지를 작성해주세요"
          className="w-400 h-350 text-12 ml-1 px-3 py-2 border border-gray-300 rounded-sm bg-white text-black placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
        />
      </div>
    </>
  );
};

export default MeetingRightSection;
