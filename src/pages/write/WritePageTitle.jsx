import React from 'react';
import styled from 'styled-components';

const WritePageTitle = ({ titleValue, setTitleValue }) => {
  return (
    <StTitleSection>
      <label>제목</label>
      <input value={titleValue} onChange={setTitleValue} placeholder="제목을 입력해주세요." />
    </StTitleSection>
  );
};

const StTitleSection = styled.section`
  position: relative;
  width: 100%;
  height: 3.4375rem;
  margin: 2.625rem 0 2.125rem 0;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;
  font-size: 2.441rem;

  & label {
    font-weight: bold;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    height: 70%;
    transform: translate(0, -50%);
    background-color: transparent;
    padding-bottom: 0.5rem;
  }
  & input {
    color: inherit;
    font-size: inherit;
    padding: 0 1em 0 2.5em;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }
`;
export default WritePageTitle;
