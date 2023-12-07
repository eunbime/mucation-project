import React from 'react';
import { StLoginPageContainer, StLoginPageInputForm } from './Login.styles';
import Button from 'components/common/Button';
import { Link, useParams } from 'react-router-dom';
import LoginInputSection from './LoginInputSection';

const SIGNUP_INPUT = [
  { text: '아이디', type: 'text' },
  { text: '비밀번호', type: 'password' },
  { text: '비밀번호 확인', type: 'password' },
  { text: '닉네임', type: 'text' }
];

const LOGIN_INPUT = [
  { text: '아이디', type: 'text' },
  { text: '비밀번호', type: 'password' }
];

const Login = () => {
  const params = useParams();
  const currentLoginPageMode = params.mode;

  const signUpSubmitHandler = () => {};

  const loginSubmitHandler = () => {};

  const LOGIN_PAGE_MODE = {
    login: {
      text: '로그인',
      input: LOGIN_INPUT,
      linkText: '회원가입',
      linkPath: 'signup',
      submitHandler: loginSubmitHandler
    },
    signup: {
      text: '회원가입',
      input: SIGNUP_INPUT,
      linkText: '로그인',
      linkPath: 'login',
      submitHandler: signUpSubmitHandler
    }
  };
  const currentModeInfo = LOGIN_PAGE_MODE[currentLoginPageMode];

  return (
    <StLoginPageContainer>
      <h1>{currentModeInfo.text}</h1>
      <StLoginPageInputForm>
        {currentModeInfo.input.map((item, index) => (
          <LoginInputSection key={index} text={item.text} type={item.type} />
        ))}
        <Button text={currentModeInfo.text} handler={currentModeInfo.submitHandler} />
      </StLoginPageInputForm>

      <Link to={`/login/${currentModeInfo.linkPath}`}>
        <span>{currentModeInfo.linkText}</span> 페이지로 이동
      </Link>

      <section>소셜로그인 자리입니다.</section>
    </StLoginPageContainer>
  );
};

export default Login;
