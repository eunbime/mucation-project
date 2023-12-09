import React from 'react';
import DetailPageVideoArea from './DetailPageVideoArea';
import styled from 'styled-components';
import DetailPageUserInfo from './DetailPageUserInfo';
import DetailPageHeart from './DetailPageHeart';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Detail = () => {
  // 데이터 가져오기
  const location = useLocation();
  console.log(location.state);
  // const { isLoading, isError, data: posts } = useQuery('posts', getPosts);

  // console.log('선택정보', inform);
  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);
  console.log('같이랜더링', datas);

  return (
    <StDetailPageWrapper>
      <DetailPageVideoArea />
      <StSubLineWrapper>
        <h3>{datas?.title} </h3>
        <div>
          <span>{datas?.date}</span>
          <DetailPageHeart />
        </div>
      </StSubLineWrapper>
      <DetailPageUserInfo />
      <StContextP>{datas?.context}</StContextP>
    </StDetailPageWrapper>
  );
};

const StDetailPageWrapper = styled.div`
  width: 57.9375rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 7.4375rem;
  color: #ffffff;
`;

const StSubLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  margin-top: 3.0625rem;
  padding-bottom: 1.125rem;
  border-bottom: 1px solid #ff683b;
  & h3 {
    font-size: 2.441rem;
  }
  & span {
    font-size: 1.25rem;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
`;

const StContextP = styled.p`
  width: 100%;
  padding: 0 4.5625rem;
  font-size: 1.25rem;
`;
export default Detail;
