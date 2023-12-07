import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderNav = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/login/login');
  };
  const goToProfilePage = () => {
    navigate('/profile');
  };
  return (
    <Container>
      <button onClick={goToLoginPage}>로그인</button>
      <button>로그아웃</button>
      <button onClick={goToProfilePage}>프로필</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1rem;
`;

export default HeaderNav;
