import React, { useEffect } from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserPostCard from './UserPostCard';
import EditProfileModal from './EditProfileModal';
import { useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';

const Profile = () => {
  const { isEditingUserProfile } = useSelector((state) => state.profileSlice);

  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ProfileContainer>
      <UserCard />
      <UserPostCard />
      {isEditingUserProfile ? <EditProfileModal /> : null}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  max-width: 1050px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 8rem;
  margin: 0 auto;
  @media (max-width: 1050px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
