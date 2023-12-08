import React from 'react';
import PostList from 'components/post-list/PostList';
import Location from 'components/location/Location';
import { StHomeContainer } from './Home.styles';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';

const Home = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <StHomeContainer>
      <Location />
      <PostList />
    </StHomeContainer>
  );
};

export default Home;
