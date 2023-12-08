import { useAuth } from '../../../hooks/useAuth';
import Button from 'components/common/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { StHeaderButtonContainer, StHeaderProfile } from '../Header.styles';

const HeaderNav = () => {
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.authSlice.isLogin);

  const { logoutHandler } = useAuth();

  const goToLoginPage = () => {
    navigate('/login/login');
  };

  const goToProfilePage = () => {
    navigate('/profile');
  };

  const goToWritePage = () => {
    navigate('/write');
  };

  const logoutBtnHandler = () => {
    logoutHandler();
  };

  const { currentUser } = useAuth();

  return (
    <StHeaderButtonContainer>
      {!isLogin && <Button text="로그인" handler={goToLoginPage} />}
      {isLogin && (
        <>
          <Button text="로그아웃" mode="black" handler={logoutBtnHandler} />
          <Button text="작성" handler={goToWritePage} />
          <StHeaderProfile onClick={goToProfilePage}>
            <figure>
              <img
                src={currentUser.photoURL || 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png'}
              ></img>
            </figure>
            <span>내정보</span>
          </StHeaderProfile>
        </>
      )}
    </StHeaderButtonContainer>
  );
};

export default HeaderNav;
