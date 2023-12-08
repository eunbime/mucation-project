import React from 'react';
import { StPostItemWrapper } from './PostItem.styles';

const PostItem = ({ post }) => {
  // TODO: 디테일 페이지 이동 핸들러 (게시물 아이디 값 사용)

  return (
    <StPostItemWrapper>
      <h3>{post.title}</h3>
      <p>{post.context}</p>
    </StPostItemWrapper>
  );
};

export default PostItem;
