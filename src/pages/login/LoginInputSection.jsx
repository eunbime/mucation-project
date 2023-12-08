import React from 'react';
import { StLoginPageInputSection } from './Login.styles';

const LoginInputSection = ({ text, type, value, setValue }) => {
  return (
    <StLoginPageInputSection>
      <input placeholder={text} type={type} value={value} onChange={setValue} />
    </StLoginPageInputSection>
  );
};

export default LoginInputSection;
