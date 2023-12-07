import React from 'react';
import styled from 'styled-components';

const WritePageContext = ({ contextValue, setContextValue }) => {
  return (
    <StContextSection>
      <textarea value={contextValue} onChange={setContextValue} placeholder="내용을 입력해주세요." />
    </StContextSection>
  );
};
const StContextSection = styled.section`
  width: 100%;
  height: 10rem;
  font-size: 1.25rem;
  margin: 0 0 2rem 0;

  & textarea {
    font-family: inherit;
    font-size: inherit;
    padding: 1.25rem;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    border: 1px solid #fff;
    background-color: transparent;
    color: #fff;
  }
`;
export default WritePageContext;
