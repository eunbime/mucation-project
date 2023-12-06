import React from 'react';
import { ReactComponent as Heart } from '../../styles/img/detailPage/heart.svg';
import styled from 'styled-components';

const DetailPageHeart = () => {
  return (
    <StHeartArea>
      <Heart />
      <span>10</span>
    </StHeartArea>
  );
};

const StHeartArea = styled.section`
  display: flex;
  align-items: center;
  margin-top: 0.3125rem;
  & > span {
    margin-left: 0.1875rem;
    font-size: 0.8rem;
  }
`;

export default DetailPageHeart;
