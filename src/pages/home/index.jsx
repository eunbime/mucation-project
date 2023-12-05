import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <Container>
      <MapSection>
        <MapWrapper>
          <div>맵</div>
        </MapWrapper>
        <MapButtonBox>
          <button>검색아이콘</button>
          <button>현재위치아이콘</button>
        </MapButtonBox>
      </MapSection>
      <MusicListSection>
        <MusicList>
          <MusicItem>list1</MusicItem>
          <MusicItem>list2</MusicItem>
          <MusicItem>list3</MusicItem>
          <MusicItem>list4</MusicItem>
        </MusicList>
      </MusicListSection>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 1rem 1rem 1rem;
  gap: 2rem;
`;

const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  height: 300px;
  position: relative;
`;

const MapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
`;

const MapButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
`;

const MusicListSection = styled.section`
  border: 1px solid #222;
  border: 1px solid #222;
  width: 100%;
  margin: 0 auto;
`;

const MusicList = styled.ul`
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

export default Home;
