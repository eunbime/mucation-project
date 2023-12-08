import React, { useEffect } from 'react';
import { StLoginPageContainer, StLoginPageInputForm } from './Login.styles';
import Button from 'components/common/Button';
import { Link, useParams } from 'react-router-dom';
import LoginInputSection from './LoginInputSection';
import useInput from 'hooks/useInput';
import { useAuth } from 'hooks/useAuth';
import LoginSocialLoginSection from './LoginSocialLoginSection';
import useAlert from 'hooks/useAlert';
import AlertModal from 'components/alertModal/AlertModal';

const Login = () => {
  const params = useParams();
  const currentLoginPageMode = params.mode;

  const { loginHandler, signUpHandler } = useAuth();

  const [email, setEmail, setEmailValue] = useInput();
  const [password, setPassword, setPasswordValue] = useInput();
  const [passwordCheck, setPasswordCheck, setPasswordCheckValue] = useInput();
  const [nickname, setNickname, setNicknameValue] = useInput();

  useEffect(() => {
    setEmailValue('');
    setPasswordValue('');
    setPasswordCheckValue('');
    setNicknameValue('');
  }, [currentLoginPageMode]);

  const SIGNUP_INPUT = [
    { text: '이메일', type: 'email', value: email, setValue: setEmail },
    { text: '비밀번호', type: 'password', value: password, setValue: setPassword },
    { text: '비밀번호 확인', type: 'password', value: passwordCheck, setValue: setPasswordCheck },
    { text: '닉네임', type: 'text', value: nickname, setValue: setNickname }
  ];

  const LOGIN_INPUT = [
    { text: '이메일', type: 'email', value: email, setValue: setEmail },
    { text: '비밀번호', type: 'password', value: password, setValue: setPassword }
  ];

  // input validation check
  const emailReg = new RegExp('[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}');
  const pwReg = new RegExp('(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}');

  const { alert } = useAlert();

  const signUpInputValidation = () => {
    if (!email || !password || !passwordCheck || !nickname) {
      alert({ title: '입력오류', message: '모든 값을 입력하세요.' });
      return;
    }
    if (!emailReg.test(email)) {
      alert({ title: '입력오류', message: '정확한 이메일을 입력하세요.' });
      return false;
    }
    if (!pwReg.test(password)) {
      alert({ title: '입력오류', message: '비밀번호는 8자 이상, 하나 이상의 숫자, 문자, 특수문자로 구성하세요.' });
      return false;
    }
    if (password !== passwordCheck) {
      alert({ title: '입력오류', message: '비밀번호가 일치하지 않습니다.' });
      return false;
    }
    if (nickname.length > 10) {
      alert({ title: '입력오류', message: '닉네임은 10자 이하로 구성하세요.' });
      return false;
    }
    return true;
  };

  const loginInputValidation = () => {
    if (!email || !password) {
      alert({ title: '입력오류', message: '모든 값을 입력하세요.' });
      return;
    }
    if (!emailReg.test(email)) {
      alert({ title: '입력오류', message: '이메일을 확인하세요.' });
      return false;
    }
    return true;
  };

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    if (!loginInputValidation()) return;
    loginHandler({ email, password });
  };

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    if (!signUpInputValidation()) return;
    signUpHandler({ email, password, nickname });
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
      <LoginSocialLoginSection />
    </StLoginPageContainer>
  );
};

export default Login;
