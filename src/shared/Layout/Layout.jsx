import Footer from 'components/footer/Footer';
import Header from 'components/header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Layout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: auto;
  min-height: calc(100vh - 6rem);
  width: 100vw;
`;

export default Layout;
