import React, { useEffect } from 'react';
import PostList from 'components/post-list/PostList';
import Location from 'components/location/Location';
import { StHomeContainer } from './Home.styles';
import { useState } from 'react';
import { useAuth } from 'hooks/useAuth';

const Home = () => {
  const { checkAuth } = useAuth();
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });

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
