import React, { useState } from 'react';

const AdminManagementModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCircleClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        className="w-32 h-32 rounded-full bg-white flex items-center justify-center cursor-pointer"
        onClick={handleCircleClick}
      >
        <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-4xl">+</span>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 h-96 bg-white rounded-lg p-4">
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleModalClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminManagementModal;