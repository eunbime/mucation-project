import React from 'react';
import styled from 'styled-components';

const WritePageMap = () => {
  return (
    <StMapArea>
      <div>map</div>
      <div>
        <span>위치데이터가 나오는 곳 입니다.</span>
        <button>위치 설정</button>
      </div>
    </StMapArea>
  );
};

// 페이지 틀을 위한 더미 컴포넌트
const StMapArea = styled.section`
  width: 100%;
  height: 20rem;
  background: green;
  margin-bottom: 1rem;
`;
export default WritePageMap;
