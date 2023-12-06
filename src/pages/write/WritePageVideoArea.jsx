import Button from 'components/common/Button';
import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';

const WritePageVideoArea = ({ selectVideo, selectVideoModalOpenHandler }) => {
  return (
    <StVideoSection>
      {selectVideo ? (
        <YouTube videoId={selectVideo} style={{ width: '100%' }} opts={{ width: '100%' }} />
      ) : (
        <Button text="동영상 선택하기" handler={selectVideoModalOpenHandler} />
      )}
    </StVideoSection>
  );
};

const StVideoSection = styled.section`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;

  & iframe,
  & button {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  & button {
    background: none;
    cursor: pointer;
    font-size: 2rem;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default WritePageVideoArea;
