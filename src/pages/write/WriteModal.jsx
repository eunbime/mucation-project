import React, { useState } from 'react';
import './WriteModa.css';
import WriteModalSearch from './WriteModalSearch';

const WriteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* <button onClick={openModal}>모달 열기</button> */}

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <WriteModalSearch></WriteModalSearch>
          </div>
        </div>
      )}
    </div>
  );
};

export default WriteModal;
