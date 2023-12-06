import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserPostCard from './UserPostCard';

const Profile = () => {
  return (
    <ProfileContainer>
      <UserCard />
      <UserPostCard />
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  background-color: #000;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-top: 5rem;
`;
