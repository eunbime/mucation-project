import React from 'react';
import PostItem from './PostItem';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { StPostSection, StPostListWrapper } from './PostList.styles';

// 메인화면, 마이페이지에서 사용
const PostList = () => {
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);

  console.log(posts);

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;

  return (
    <StPostSection>
      <StPostListWrapper>
        {posts.map((item) => (
          <PostItem key={item.id} post={item} />
        ))}
      </StPostListWrapper>
    </StPostSection>
  );
};



export default PostList;
