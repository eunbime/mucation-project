import React from 'react';
import styled from 'styled-components';

const HeaderNav = () => {
  return (
    <Container>
      <div>로그인</div>
      <div>로그아웃</div>
      <div>프로필</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

export default HeaderNav;
