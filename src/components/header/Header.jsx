import React from 'react';
import HeaderNav from './nav/HeaderNav';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <h1>logo</h1>
      <HeaderNav />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  padding: 1rem;
`;

export default Header;
