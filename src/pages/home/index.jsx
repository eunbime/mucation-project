import React, { useEffect } from 'react';
import PostList from 'components/post-list/PostList';
import Location from 'components/location/Location';
import { StHomeContainer } from './Home.styles';

import { useAuth } from 'hooks/useAuth';
import AlertModal from 'components/alertModal/AlertModal';

const Home = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <StHomeContainer>
      <AlertModal />
      <Location />
      <PostList />
    </StHomeContainer>
  );
};

export default Home;
