import React from 'react';
import styled from 'styled-components';

const MusicList = () => {
  return (
    <MusicContainer>
      <MusicListWrapper>
        <MusicItem>list1</MusicItem>
        <MusicItem>list2</MusicItem>
        <MusicItem>list3</MusicItem>
        <MusicItem>list4</MusicItem>
      </MusicListWrapper>
    </MusicContainer>
  );
};

const MusicContainer = styled.div`
  border: 1px solid #222;
  border: 1px solid #222;
  width: 100%;
  margin: 0 auto;
`;

const MusicListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
`;

const MusicItem = styled.li`
  border: 1px solid black;
  width: 100%;
  height: 200px;
`;

export default MusicList;
