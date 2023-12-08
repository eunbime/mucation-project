import React from 'react';
import { ReactComponent as Github } from '../../styles/img/loginPage/github.svg';
import { ReactComponent as Google } from '../../styles/img/loginPage/google.svg';
import { useAuth } from 'hooks/useAuth';
import { StLoginSocialButtonArea } from './Login.styles';

const LoginSocialLoginSection = () => {
  const { socialLoginHandler } = useAuth();
  return (
    <StLoginSocialButtonArea>
      <button onClick={() => socialLoginHandler('google')}>
        <Google />
      </button>
      <button onClick={() => socialLoginHandler('github')}>
        <Github />
      </button>
    </StLoginSocialButtonArea>
  );
};

export default LoginSocialLoginSection;
