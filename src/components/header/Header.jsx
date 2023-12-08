import React from 'react';
import HeaderNav from './nav/HeaderNav';
import { Link } from 'react-router-dom';
import { StHeaderContainer } from './Header.styles';

const Header = () => {
  return (
    <StHeaderContainer>
      <Link to={'/'}>
        <h1>Home</h1>
      </Link>
      <HeaderNav />
    </StHeaderContainer>
  );
};

export default Header;
