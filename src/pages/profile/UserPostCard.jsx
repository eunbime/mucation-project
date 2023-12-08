import React, { useEffect } from 'react';
import {
  StUserSharedPostsContainer,
  StPostCard,
  StThumnail,
  StPostInfoWrapper,
  StPostTitle,
  StPostContent
} from './profile.styles';

import { useAuth } from 'hooks/useAuth.js';
import { useQuery } from 'react-query';
import { getCurrentUserPost } from '../../axios/firebaseApi.js';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

const UserPostCard = () => {
  const currentUser = useAuth().currentUser.uid;
  const { isLoading, isError, data: posts } = useQuery('posts', getCurrentUserPost);
  const navigate = useNavigate();

  const navigateToDetaile = (e) => {};

  return (
    <StUserSharedPostsContainer>
      {posts.map((post) => {
        return (
          <StPostCard key={post.id}>
            <StThumnail></StThumnail>
            <StPostInfoWrapper>
              <StPostTitle>{post.title}</StPostTitle>
              <StPostContent>{post.context}</StPostContent>
              <p>{post.date}</p>
            </StPostInfoWrapper>
            <Button text={'상세보기'}></Button>
          </StPostCard>
        );
      })}
    </StUserSharedPostsContainer>
  );
};

export default UserPostCard;
