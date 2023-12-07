import React from 'react';
import styled from 'styled-components';

const Button = ({ text, handler }) => {
  const buttonClickEventHandler = () => {
    handler();
  };
  return <StButton onClick={buttonClickEventHandler}>{text}</StButton>;
};

// 공통 버튼 스타일 지정 필요, 디폴트 데이터
const StButton = styled.button`
  font-size: 1.25rem;
  padding: 0.5625rem 2.125rem;
  font-weight: bold;
  border-radius: 5px;
  background: var(--mainOrange);
  color: var(--mainWhite);
`;

export default Button;
