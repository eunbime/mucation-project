import React from 'react';
import { useSelector } from 'react-redux';
import { StUserInfoSection } from './Detail.styles';

const DetailPageUserInfo = () => {
  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);
  return (
    <StUserInfoSection>
      <figure>
        <img src={datas?.userPhoto} />
      </figure>
      <span>{datas?.nickname}</span>
    </StUserInfoSection>
  );
};

export default DetailPageUserInfo;
