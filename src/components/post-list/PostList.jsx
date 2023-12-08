import React from 'react';
import PostItem from './post-item/PostItem';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { StPostSection, StPostListWrapper } from './PostList.styles';

// 메인화면, 마이페이지에서 사용
const PostList = () => {
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;

  return (
    <PostSection>
      <PostListWrapper>
        {posts.map((item) => (
          <PostItem key={item.id} post={item} />
        ))}
      </PostListWrapper>
    </PostSection>
  );
};

const PostSection = styled.section`
  border: 1px solid #222;
  width: 100%;
  margin: 0 auto;
`;

const PostListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 1rem;
  overflow-y: auto;
`;

export default PostList;
