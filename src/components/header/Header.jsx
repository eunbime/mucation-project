import React from 'react';
import HeaderNav from './nav/HeaderNav';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <Link to={'/'}>
        <h1>Home</h1>
      </Link>
      <HeaderNav />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: var(--subColor);
  h1 {
    color: var(--mainWhite);
  }
`;

export default Header;
