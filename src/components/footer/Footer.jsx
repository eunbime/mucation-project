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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 6rem;
`;

export default Footer;
