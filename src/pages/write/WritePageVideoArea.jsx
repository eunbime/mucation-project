import Button from 'components/common/Button';
import React from 'react';
import YouTube from 'react-youtube';
import { StSelectVideoBtn, StVideoSection } from './write.styles';

const WritePageVideoArea = ({ selectVideo, toggleModal }) => {
  return (
    <StVideoSection>
      {selectVideo && <Button text="다른노래 선택하기" handler={toggleModal} />}
      {selectVideo ? (
        <YouTube videoId={selectVideo} style={{ width: '100%' }} opts={{ width: '100%' }} />
      ) : (
        <StSelectVideoBtn onClick={toggleModal}>동영상 선택하기</StSelectVideoBtn>
      )}
    </StVideoSection>
  );
};

export default WritePageVideoArea;
