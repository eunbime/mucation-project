import React, { useEffect } from 'react';
import DetailPageVideoArea from './DetailPageVideoArea';
import DetailPageUserInfo from './DetailPageUserInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { StDetailPageWrapper, StSubLineWrapper, StContextP } from './Detail.styles';
import EditDeleteArea from './EditDeleteArea';
import { selectedvideo } from '../../redux/modules/seletcedVideoSlice';

const Detail = () => {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  //현재 비디오 데이터
  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);

  useEffect(() => {
    dispatch(selectedvideo(JSON.parse(localStorage.getItem('post'))));
  }, []);

  const convertNumberToDate = () => {
    const number = parseInt(datas?.date);
    const dateObject = new Date(number);

    // 예시: "2023-01-01 12:34:56" 형식으로 표시
    const formattedDateString = dateObject.toLocaleString();
    return formattedDateString;
  };

  return (
    <StDetailPageWrapper>
      <DetailPageVideoArea />
      <StSubLineWrapper>
        <h3>{datas?.title} </h3>
        <div>
          <span>{datas && convertNumberToDate()}</span>
          {currentUser?.uid === datas?.uid && <EditDeleteArea />}
        </div>
      </StSubLineWrapper>
      <DetailPageUserInfo />
      <StContextP>{datas?.context}</StContextP>
    </StDetailPageWrapper>
  );
};

export default Detail;
