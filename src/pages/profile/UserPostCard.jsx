import React from 'react';
import styled from 'styled-components';

const UserPostCard = () => {
  return (
    <UserSharedPostsContainer>
      <PostCard>
        <Thumnail></Thumnail>
        <PostInfoWrapper>
          <PostTitle>Post Title</PostTitle>
          <PostContent>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ex recusandae eligendi voluptates.
          </PostContent>
        </PostInfoWrapper>
      </PostCard>
    </UserSharedPostsContainer>
  );
};

export default UserPostCard;

const UserSharedPostsContainer = styled.div`
  display: flex;
  background-color: #7270ff;
  margin: 2rem;
`;

const PostCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const Thumnail = styled.img`
  background-color: orange;
  height: 10rem;
  width: 20rem;
`;

const PostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostTitle = styled.h2`
  color: #fff;
  font-size: 2.4rem;
`;

const PostContent = styled.p`
  color: #fff;
`;
