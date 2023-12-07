import React from 'react';
import { StLoginPageContainer, StLoginPageInputForm } from './Login.styles';
import Button from 'components/common/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoginInputSection from './LoginInputSection';
import useInput from 'hooks/useInput';
import { loginEmail, loginGoogle, signUpEmail } from '../../axios/firebaseApi';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/modules/authSlice';

const Login = () => {
  const dispatch = useDispatch();

  const params = useParams();
  const currentLoginPageMode = params.mode;

  const navigate = useNavigate();

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

  // react-query를 이용한 로그인 로직
  const loginMutate = useMutation(loginEmail, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.user.accessToken);
      dispatch(setUserInfo(data.user));
      console.log('로그인 성공!!!');
      navigate('/');
    },
    onError: (error) => {
      console.error('로그인 실패>>>>', error.message);
    }
  });

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    loginMutate.mutate({ email, password });
  };

  // react-query를 이용한 회원가입 로직
  const signUpMutate = useMutation(signUpEmail, {
    onSuccess: (data) => {
      console.log('회원가입 성공!!!', data);
      navigate('/login/login');
    },
    onError: (error) => {
      console.error('회원가입 실패>>>>', error.message);
    }
  });

  const signUpSubmitHandler = (e) => {
    e.preventDefault();
    signUpMutate.mutate({ email, password });
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
        <button onClick={loginGoogle}>Google</button>
        <button onClick={loginGoogle}>Google</button>
        <button onClick={loginGoogle}>Google</button>
      </section>
    </StLoginPageContainer>
  );
};

export default Login;
