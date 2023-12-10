import { useDispatch } from 'react-redux';
import { selectedvideo } from '../../redux/modules/seletcedVideoSlice';
import { useNavigate } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const navigation = useNavigate();

  // date 변환
  const number = parseInt(post.date);
  const dateObject = new Date(number);
  const formattedDateString = dateObject.toLocaleString();

  // 디테일 페이지로 이동
  const selectedMovieToDatail = (post) => {
    dispatch(selectedvideo(post));

    navigation('/detail');
  };

  return (
    <StPostItemWrapper onClick={() => selectedMovieToDatail(post)}>
      <StThumbnailBox>
        <StThumbnailImg src={post.thumbnail} alt="youtube thumbnail" />
      </StThumbnailBox>
      <StInfoBox>
        <StPostTitle>{post.title}</StPostTitle>
        <StUserInfo>
          <UserProfile>
            <img src={post.userPhoto} alt="" />
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
