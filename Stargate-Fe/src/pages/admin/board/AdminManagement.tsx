import AdminBoardHeaderNav from '../../../atoms/board/AdminBoardHeaderNav';
import AdminManagementModal from '@/organisms/board/AdminManagementModal';

const AdminManagement = () => {
  return (
    <div className="w-xl h-screen">
      <AdminBoardHeaderNav />
      <div className="h-4/5 flex flex-col justify-around items-center">
        <p className="form-title">소속 연예인 관리</p>
        <div>
          <AdminManagementModal/>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;
