import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DetailPageUserInfo = () => {
  const datas = useSelector((state) => state.currentVideoSlice);
  return (
    <StUserInfoSection>
      <figure>
        <img src="https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png" />
      </figure>
      <span>{datas.nickname}</span>
    </StUserInfoSection>
  );
};

const StUserInfoSection = styled.section`
  display: flex;
  align-items: center;
  align-self: start;
  margin: 1.8125rem 0 0.5625rem 0.625rem;
  & figure {
    width: 2.9375rem;
    height: 2.9375rem;
    border-radius: 50%;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  & span {
    margin-left: 1rem;
    font-size: 1.563rem;
  }
`;

export default DetailPageUserInfo;
