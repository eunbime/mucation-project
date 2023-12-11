import React from 'react';
import styled from 'styled-components';

const Button = ({ text, handler, mode }) => {
  const buttonClickEventHandler = () => {
    handler();
  };

  return (
    <StButton mode={mode} onClick={buttonClickEventHandler}>
      {text}
    </StButton>
  );
};

// 공통 버튼 스타일 지정 필요, 디폴트 데이터
const StButton = styled.button`
  height: 40px;
  font-size: small;
  padding: 0.25rem 0.8rem;
  font-weight: bold;
  border-radius: 5px;
  border: 0.15rem solid var(--mainOrange);
  background: ${(props) => (props.mode === 'black' ? 'transparent' : '#FF683B')};
  color: ${(props) => (props.mode === 'black' ? '#FF683B' : '#fff')};
  transition: 0.3s;

  &:hover {
    background: var(--mainOrange);
    color: var(--mainWhite);
    border-color: var(--mainWhite);
  }

  @media (min-width: 650px) {
    font-size: medium;
    padding: 0.65rem 1.25rem;
    height: unset;
  }
`;

export default Button;
