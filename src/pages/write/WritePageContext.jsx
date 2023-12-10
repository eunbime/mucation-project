import React from 'react';
import { StContextSection } from './write.styles';

const WritePageContext = ({ contextValue, setContextValue }) => {
  return (
    <StContextSection>
      <textarea value={contextValue} onChange={setContextValue} placeholder="내용을 입력해주세요." />
    </StContextSection>
  );
};

export default WritePageContext;
