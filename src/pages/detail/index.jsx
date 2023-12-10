import React, { useEffect, useState } from 'react';
import DetailPageVideoArea from './DetailPageVideoArea';
import DetailPageUserInfo from './DetailPageUserInfo';
// import DetailPageHeart from './DetailPageHeart';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { StDetailPageWrapper, StSubLineWrapper, StContextP } from './Detail.styles';

const Detail = () => {
  // 데이터 가져오기
  const location = useLocation();

  const [formattedDate, setFormattedDate] = useState([]);
  //현재 비디오 데이터
  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);
  // 날짜 형식 변환
  useEffect(() => {
    const convertNumberToDate = () => {
      const number = parseInt(datas?.date);
      const dateObject = new Date(number);

      // 예시: "2023-01-01 12:34:56" 형식으로 표시
      const formattedDateString = dateObject.toLocaleString();
      setFormattedDate(formattedDateString);
    };
    convertNumberToDate();
  }, []);

  return (
    <StDetailPageWrapper>
      <DetailPageVideoArea />
      <StSubLineWrapper>
        <h3>{datas?.title} </h3>
        <div>
          <span>{formattedDate}</span>
          {/* <DetailPageHeart /> */}
        </div>
      </StSubLineWrapper>
      <DetailPageUserInfo />
      <StContextP>{datas?.context}</StContextP>
    </StDetailPageWrapper>
  );
};

export default Detail;
