import React from 'react';
import styled from 'styled-components';

const PostItem = ({ post }) => {
  // TODO: 디테일 페이지 이동 핸들러 (게시물 아이디 값 사용)

  return <StPostWrapper>{post.title}</StPostWrapper>;
};

const StPostWrapper = styled.li`
  border: 1px solid black;
  width: 100%;
  height: 200px;
`;

export default PostItem;
