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
        {posts.length > 0 ? (
          posts.map((item) => <PostItem key={item.id} post={item} />)
        ) : (
          <div>현재 게시물이 등록되어 있지 않습니다.</div>
        )}
      </StPostListWrapper>
    </StPostSection>
  );
};

export default PostList;
