import React from 'react';
import PostItem from './PostItem';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { StPostSection, StPostListWrapper, NotFoundPost } from './PostList.styles';
import { useSelector } from 'react-redux';

// 메인화면, 마이페이지에서 사용
const PostList = () => {
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const { lat, lng } = useSelector((state) => state.mapSlice.location);

  // 해당 범위 안의 게시물
  const filteredPosts = posts?.filter((post) => {
    const latBounds = lat - post.location.lat;
    const lngBounds = lng - post.location.lng;

    // 마커 위치로부터 약 1km 차이의 범위
    if (-0.009 < latBounds && latBounds < 0.009) {
      if (-0.011 < lngBounds && lngBounds < 0.011) {
        return true;
      }
    }
  });

  if (isLoading && !filteredPosts) return <p>게시물을 로딩중입니다...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;

  return (
    <StPostSection>
      <StPostListWrapper>
        {filteredPosts?.length > 0 ? (
          filteredPosts.map((item) => <PostItem key={item.id} post={item} />)
        ) : (
          <NotFoundPost>
            <p>현재 위치에 게시물이 등록되어 있지 않습니다.</p>
          </NotFoundPost>
        )}
      </StPostListWrapper>
    </StPostSection>
  );
};

export default PostList;
