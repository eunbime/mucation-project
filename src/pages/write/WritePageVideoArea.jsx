import Button from 'components/common/Button';
import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const WritePageVideoArea = ({ selectVideo, selectVideoModalOpenHandler, toggleModal }) => {
  return (
    <StVideoSection>
      {selectVideo && <Button text="다른노래 선택하기" handler={toggleModal} />}
      {selectVideo ? (
        <YouTube videoId={selectVideo} style={{ width: '100%' }} opts={{ width: '100%' }} />
      ) : (
        <StSelectVideoBtn onClick={selectVideoModalOpenHandler}>동영상 선택하기</StSelectVideoBtn>
      )}
    </StVideoSection>
  );
};

const StSelectVideoBtn = styled.button`
  right: unset !important;
  transform: unset !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
  font-size: 2rem;
  border: 1px solid var(--mainOrange);
  border-radius: 10px;
  color: var(--mainWhite);
  background-color: transparent;
`;

const StVideoSection = styled.section`
  position: relative;
  width: 100%;
  height: 25.5625rem;

  & button {
    position: absolute;
    right: 0;
    top: -0.625rem;
    transform: translate(0, -100%);
  }

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export default WritePageVideoArea;
