import React from 'react';
import { StTitleSection } from './write.styles';

const WritePageTitle = ({ titleValue, setTitleValue }) => {
  return (
    <StTitleSection>
      <label>제목</label>
      <input value={titleValue} onChange={setTitleValue} placeholder="제목을 입력해주세요." />
    </StTitleSection>
  );
};

export default WritePageTitle;
