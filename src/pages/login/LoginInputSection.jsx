import React from 'react';
import { StLoginPageInputSection } from './Login.styles';

const LoginInputSection = ({ text }) => {
  return (
    <StLoginPageInputSection>
      <input placeholder={text} />
    </StLoginPageInputSection>
  );
};

export default LoginInputSection;
