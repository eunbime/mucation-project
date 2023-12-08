import React from 'react';
import { StPostItemWrapper, StPostThumbnail, StPostText } from './PostItem.styles';
// import styled from 'styled-components';

const PostItem = ({ post }) => {
  // TODO: 디테일 페이지 이동 핸들러 (게시물 아이디 값 사용)
  console.log('postitem', post);
  return (
    <StPostItemWrapper>
      <div>
        <StPostThumbnail src={post.thumbnail} alt="앨범이미지" />
      </div>
      <StPostText>
        <h1>{post.title}</h1>
        <p>{post.nickname}</p>
        <p>{post.date}</p>
        <p>{post.context}</p>
      </StPostText>
    </StPostItemWrapper>
  );
};

// const StPostWrapper = styled.li`
//   display: flex;
//   border: 1px solid black;
//   width: 100%;
//   height: 200px;
// `;

export default PostItem;
