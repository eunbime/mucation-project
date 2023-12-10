import React from 'react';
import DetailPageVideoArea from './DetailPageVideoArea';
import DetailPageUserInfo from './DetailPageUserInfo';
import EditDeleteArea from './EditDeleteArea';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { StDetailPageWrapper, StSubLineWrapper, StContextP } from './Detail.styles';

const Detail = () => {
  // 데이터 가져오기
  const location = useLocation();
  console.log(location.state);
  // const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const { currentUser } = useAuth();
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
          {currentUser?.uid === datas?.uid && <EditDeleteArea />}
        </div>
      </StSubLineWrapper>
      <DetailPageUserInfo />
      <StContextP>{datas?.context}</StContextP>
    </StDetailPageWrapper>
  );
};

export default Detail;
