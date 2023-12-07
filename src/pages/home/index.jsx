import React from 'react';
import styled from 'styled-components';
import PostList from 'components/post-list/PostList';
import Location from 'components/location/Location';

const Home = () => {
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
