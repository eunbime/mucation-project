import React from 'react';
import DetailPageVideoArea from './DetailPageVideoArea';
import styled from 'styled-components';
import DetailPageUserInfo from './DetailPageUserInfo';
import DetailPageHeart from './DetailPageHeart';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { useSelector } from 'react-redux';

const Detail = () => {
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const inform = useSelector((state) => state.seletcedVideoSlice
  );
  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;


  console.log('detail', inform);
  return (
    <StDetailPageWrapper>
      <DetailPageVideoArea inform={inform} />
      <StSubLineWrapper>
        <h3>OO에서 듣기 좋은 음악 </h3>
        <div>
          <span>2023-10-10</span>
          <DetailPageHeart />
        </div>
      </StSubLineWrapper>
      <DetailPageUserInfo />
      <StContextP>
        Lorem ipsum dolor sit amet consectetur. Vulputate sit turpis ac vel amet. Amet nisl nunc eget nunc. Et
        ullamcorper ut pretium consectetur consequat diam felis eget ut. Rhoncus urna placerat sit pulvinar.
      </StContextP>
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
