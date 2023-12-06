import React from 'react';
import styled from 'styled-components';

const HeaderNav = () => {
  return (
    <Container>
      <button>로그인</button>
      <button>로그아웃</button>
      <button>프로필</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

export default HeaderNav;
