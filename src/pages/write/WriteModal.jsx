import React, { useState } from 'react';
import './WriteModal.css';
import WriteModalSearch from './WriteModalSearch';

const WriteModal = ({ setSelectVideo, selectVideo, toggleModal }) => {
  return (
    <div>
      <div className="modal-overlay" onClick={toggleModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <WriteModalSearch setSelectVideo={setSelectVideo} selectVideo={selectVideo} toggleModal={toggleModal} />
        </div>
      </div>
    </div>
  );
};

export default WriteModal;
