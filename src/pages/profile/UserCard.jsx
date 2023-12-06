import { getAuth } from 'firebase/auth';
import React from 'react';
import styled from 'styled-components';

const UserCard = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(auth);
  return (
    <div>
      <UserInfoContainer>
        <Avatar
          src={
            user.photoURL === null
              ? 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png'
              : user.photoURL
          }
        ></Avatar>
        <Nickname>{user.displayName === null ? '익명' : user.displayName}</Nickname>
        <Email>{user.email === null ? '익명' : user.email}</Email>
        <Introduce>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ex recusandae eligendi voluptates.
        </Introduce>
        <FavoriteGenre>#KPOP</FavoriteGenre>
        <button>프로필 수정</button>
      </UserInfoContainer>
    </div>
  );
};

export default UserCard;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const Avatar = styled.img`
  background-color: #fff;
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
`;

const Nickname = styled.h2`
  color: #fd5625;
  font-size: 1.8rem;
`;

const Email = styled.p`
  font-size: 1rem;
  color: #fff;
`;

const Introduce = styled.p`
  color: #fff;
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.2;
`;

const FavoriteGenre = styled.span`
  color: #7270ff;
  border: 1px solid #7270ff;
  padding: 0.4rem 0.8rem;
  border-radius: 5rem;
`;
