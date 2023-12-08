import React, { useEffect, useState } from 'react';
import {
  StUserSharedPostsContainer,
  StPostCard,
  StThumnail,
  StPostInfoWrapper,
  StPostTitle,
  StPostContent
} from './profile.styles';

import { useQuery } from 'react-query';
import { getCurrentUserPost } from '../../axios/firebaseApi.js';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

const UserPostCard = () => {
  const { isLoading, isError, data: posts } = useQuery('posts', getCurrentUserPost);
  const navigate = useNavigate();

  const [formattedDate, setFormattedDate] = useState([]);

  // 파이어베이스 날짜 변환

  useEffect(() => {
    const convertFirebaseNumberToDate = () => {
      posts.map((num) => {
        const number = parseInt(num.date);
        const dateObject = new Date(number);
        // 예시: "2023-01-01 12:34:56" 형식으로 표시
        const formattedDateString = dateObject.toLocaleString();
        setFormattedDate(formattedDateString);
      });
    };
    convertFirebaseNumberToDate();
  }, []);

  const navigateToDetaile = (e) => {};

  return (
    <StUserSharedPostsContainer>
      {posts.map((post) => {
        return (
          <StPostCard key={post.id}>
            {/* 이미지 가져오기 */}
            <StThumnail src={`https://img.youtube.com/vi/${post.thumnail}/0.jpg`}></StThumnail>
            <StPostInfoWrapper>
              <StPostTitle>{post.title}</StPostTitle>
              <StPostContent>{post.context}</StPostContent>
              <span>{formattedDate}</span>
            </StPostInfoWrapper>
            <Button text={'상세보기'}></Button>
          </StPostCard>
        );
      })}
    </StUserSharedPostsContainer>
  );
};

export default UserPostCard;
