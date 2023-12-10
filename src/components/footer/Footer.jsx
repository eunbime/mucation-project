import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Github } from '../../styles/img/loginPage/github.svg';
import { Link } from 'react-router-dom';

const icon = '/components/footer/Footer.jsx';
console.log(icon);

const Footer = () => {
  return (
    <Container>
      <Link to={'https://github.com/eunbime/mucation-project'}>
        <Github />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
  transform: translate(0, 120%);
`;

export default Footer;
