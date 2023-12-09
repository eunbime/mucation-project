import React from 'react';
import HeaderNav from './nav/HeaderNav';
import { Link } from 'react-router-dom';
import { StHeaderContainer, StHeaderTitle } from './Header.styles';
import AlertModal from 'components/alertModal/AlertModal';

const Header = () => {
  return (
    <StHeaderContainer>
      <AlertModal />
      <StHeaderTitle to={'/'}>Mucation</StHeaderTitle>
      <HeaderNav />
    </StHeaderContainer>
  );
};

export default Header;
