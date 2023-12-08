import React from 'react';
import HeaderNav from './nav/HeaderNav';
import { Link } from 'react-router-dom';
import { StHeaderContainer } from './Header.styles';
import AlertModal from 'components/alertModal/AlertModal';

const Header = () => {
  return (
    <StHeaderContainer>
      <AlertModal />
      <Link to={'/'}>
        <h1>Home</h1>
      </Link>
      <HeaderNav />
    </StHeaderContainer>
  );
};

export default Header;
