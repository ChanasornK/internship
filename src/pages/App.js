import React, { useState } from 'react';
import SuccessPopup from './SuccessPopup';

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App flex justify-center items-center h-screen">
      <button
        onClick={handleShowPopup}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Show Success Popup
      </button>

      <SuccessPopup
        message="เข้าสู่ระบบสำเร็จ!"
        showPopup={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default App;
