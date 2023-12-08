import React from 'react';
import { StLoginPageContainer, StLoginPageInputForm } from './Login.styles';
import Button from 'components/common/Button';
import { Link, useParams } from 'react-router-dom';
import LoginInputSection from './LoginInputSection';
import useInput from 'hooks/useInput';
import { useAuth } from 'hooks/useAuth';

const Login = () => {
  const params = useParams();
  const currentLoginPageMode = params.mode;

  const { loginHandler, signUpHandler, socialLoginHandler } = useAuth();

  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [passwordCheck, setPasswordCheck] = useInput();
  const [nickname, setNickname] = useInput();

  const SIGNUP_INPUT = [
    { text: '아이디', type: 'text', value: email, setValue: setEmail },
    { text: '비밀번호', type: 'password', value: password, setValue: setPassword },
    { text: '비밀번호 확인', type: 'password', value: passwordCheck, setValue: setPasswordCheck },
    { text: '닉네임', type: 'text', value: nickname, setValue: setNickname }
  ];

  const LOGIN_INPUT = [
    { text: '아이디', type: 'text', value: email, setValue: setEmail },
    { text: '비밀번호', type: 'password', value: password, setValue: setPassword }
  ];

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    loginHandler({ email, password });
  };

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    signUpHandler({ email, password });
  };

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
      <StLoginPageInputForm onSubmit={currentModeInfo.submitHandler}>
        {currentModeInfo.input.map((item, index) => (
          <LoginInputSection
            key={index}
            text={item.text}
            type={item.type}
            value={item.value}
            setValue={item.setValue}
          />
        ))}
        <Button text={currentModeInfo.text} handler={() => {}} />
      </StLoginPageInputForm>

      <Link to={`/login/${currentModeInfo.linkPath}`}>
        <span>{currentModeInfo.linkText}</span> 페이지로 이동
      </Link>

      <section>
        <button onClick={() => socialLoginHandler('google')}>Google</button>
        <button onClick={() => socialLoginHandler('github')}>GitHub</button>
      </section>
    </StLoginPageContainer>
  );
};

export default Login;
