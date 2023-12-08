import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserPostCard from './UserPostCard';
import EditProfileModal from './EditProfileModal';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { isEditingUserProfile } = useSelector((state) => state.auth);

  return (
    <>
      <ProfileContainer>
        <UserCard />
        <UserPostCard />
      </ProfileContainer>
      {isEditingUserProfile ? <EditProfileModal /> : null}
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
