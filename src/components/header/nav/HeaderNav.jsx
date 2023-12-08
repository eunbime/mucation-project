import { useAuth } from '../../../hooks/useAuth';
import Button from 'components/common/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNav = () => {
  const navigate = useNavigate();

  const { logoutHandler } = useAuth();

  const goToLoginPage = () => {
    navigate('/login/login');
  };

  const goToProfilePage = () => {
    navigate('/profile');
  };

  const logoutBtnHandler = () => {
    logoutHandler();
  };

  return (
    <Container>
      <Button text="로그인" handler={goToLoginPage} />
      <Button text="로그아웃" mode="black" handler={logoutBtnHandler} />
      <button onClick={goToProfilePage}>프로필</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

const StLoginButton = styled.button``;

export default HeaderNav;
