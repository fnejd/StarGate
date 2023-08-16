import { MeetingData } from '@/types/event/type';

const MeetingRightDetail = ({ formData }: { formData: MeetingData }) => {
  return (
    <div className="w-full h-600 flex flex-col justify-around">
      <div>
        {formData.imageFileInfo?.fileUrl && (
          <div>
            <p className="flex my-2 font-medium text-white font-suit text-14">
              대표사진
            </p>
            <img
              src={formData.imageFileInfo?.fileUrl}
              alt="미리보기"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
        )}
      </div>
      <div>
        <div className="flex w-48 mx-1 my-2 font-medium text-white font-suit text-14">
          공지사항
        </div>
        <textarea
          value={formData.notice}
          className="px-3 py-2 ml-1 text-black bg-white border border-gray-300 rounded-sm w-400 h-350 text-12 placeholder-pl-5 font-suit focus:outline-none focus:ring-2 focus:ring-mainblue-300 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default MeetingRightDetail;
