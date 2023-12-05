import React from 'react';
import styled from 'styled-components';

const WritePageTitle = ({ titleValue, setTitleValue }) => {
  return (
    <StTitleSection>
      <label>제목</label>
      <input value={titleValue} onChange={setTitleValue} />
    </StTitleSection>
  );
};

const StTitleSection = styled.section`
  position: relative;
  width: 100%;
  height: 3rem;
  font-size: 1.5rem;
  margin: 2rem 0 1.5rem 0;
  & label {
    font-weight: bold;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    height: 70%;
    transform: translate(0, -50%);
    padding: 0 1rem;
    border-right: 2px solid black;
  }
  & input {
    font-size: inherit;
    padding: 0 1em 0 4em;
    width: 100%;
    height: 100%;
  }
`;
export default WritePageTitle;
