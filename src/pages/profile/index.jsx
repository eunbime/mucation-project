import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserPostCard from './UserPostCard';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
  return (
    <>
      <ProfileContainer>
        <UserCard />
        <UserPostCard />
      </ProfileContainer>
      <EditProfileModal />
    </>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding-top: 8rem;
`;
