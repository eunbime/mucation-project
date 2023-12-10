import React, { useState } from 'react';
import WriteModalSearch from './WriteModalSearch';
import { StModalClose, StModalContent, StModalOverlay } from './WriteModal.style';

const WriteModal = ({ setSelectVideo, selectVideo, toggleModal }) => {
  return (
    <div>
      <StModalOverlay  onClick={toggleModal}>
        <StModalContent onClick={(e) => e.stopPropagation()}>
          <StModalClose className="close" onClick={toggleModal}>
            &times;
          </StModalClose>
          <WriteModalSearch setSelectVideo={setSelectVideo} selectVideo={selectVideo} toggleModal={toggleModal} />
        </StModalContent>
      </StModalOverlay>
    </div>
  );
};

export default WriteModal;

