import React, { useEffect } from 'react';
import PostList from 'components/post-list/PostList';
import Location from 'components/location/Location';
import { useAuth } from 'hooks/useAuth';
import { StHomeContainer } from './Home.styles';

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
