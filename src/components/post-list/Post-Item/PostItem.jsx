import React from 'react';
import { StPostItemWrapper } from './PostItem.styles';

const PostItem = ({ post }) => {
  // TODO: 디테일 페이지 이동 핸들러 (게시물 아이디 값 사용)
console.log('postitem',post);
  return <StPostWrapper>
    <div>
    <StPostThumbnail src={post.thumbnail} alt="앨범이미지" />
    </div>
    <StPostText>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <p>{post.context}</p>
      
    </StPostText>
    </StPostWrapper>;
};

const StPostText =styled.div`
margin-top : 25px;
background-color :;
width: 100%;
`
const StPostThumbnail = styled.img`
width: 20vh;

`

const StPostWrapper = styled.li`
display: flex;
  border: 1px solid black;
  width: 100%;
  height: 200px;
 
`;

export default PostItem;
