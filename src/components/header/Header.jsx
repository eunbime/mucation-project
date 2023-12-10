import React from 'react';
import HeaderNav from './nav/HeaderNav';
import { StHeaderContainer, StHeaderTitle } from './Header.styles';

const Header = () => {
  return (
    <StHeaderContainer>
      <StHeaderTitle to={'/'}>Mucation</StHeaderTitle>
      <HeaderNav />
    </StHeaderContainer>
  );
};

export default Header;
