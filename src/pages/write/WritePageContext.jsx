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
  font-size: 1.5rem;
  margin: 0 0 2rem 0;

  & textarea {
    font-size: inherit;
    padding: 1rem;
    width: 100%;
    height: 100%;
    resize: none;
  }
`;
export default WritePageContext;
