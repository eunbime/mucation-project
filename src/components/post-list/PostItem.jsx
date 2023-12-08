import React from 'react';
import {
  StPostItemWrapper,
  StThumbnailBox,
  StThumbnailImg,
  StInfoBox,
  StPostTitle,
  StUserInfo,
  UserProfile,
  StNicknameAndDate
} from './PostItem.styles';

const PostItem = ({ post }) => {
  // date 변환
  const number = parseInt(post.date);
  const dateObject = new Date(number);
  const formattedDateString = dateObject.toLocaleString();

  console.log(formattedDateString);

  return (
    <StPostItemWrapper>
      <StThumbnailBox>
        <StThumbnailImg src={post.thumbnail} alt="youtube thumbnail" />
      </StThumbnailBox>
      <StInfoBox>
        <StPostTitle>{post.title}</StPostTitle>
        <StUserInfo>
          <UserProfile>
            <img src="" alt="" />
          </UserProfile>
          <StNicknameAndDate>{post.nickname}</StNicknameAndDate>
          <StNicknameAndDate>{formattedDateString}</StNicknameAndDate>
        </StUserInfo>
        <p>{post.context}</p>
      </StInfoBox>
    </StPostItemWrapper>
  );
};

export default PostItem;
