import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostList from 'components/post-list/PostList';
import Location from 'components/location/Location';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const Home = () => {
  const userData = useSelector((state) => state.authSlice.currentUser);

  useEffect(() => {
    const currentDate = new Date().getTime();
    auth.onAuthStateChanged((user) => {
      console.log('현재시간', currentDate);
      console.log('만료시간', user?.stsTokenManager.expirationTime);
      console.log('유효한 토큰이니?>', currentDate <= user?.stsTokenManager.expirationTime);
    });
  }, []);

  return (
    <Container>
      <Location />
      <PostList />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 5rem;
  gap: 2rem;
`;

export default Home;
