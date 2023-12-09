import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { ReactComponent as Prev } from '../../styles/img/detailPage/arrow-left.svg';
import { ReactComponent as Next } from '../../styles/img/detailPage/arrow-right.svg';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { useDispatch, useSelector } from 'react-redux';
import { currentVideoData } from '../../redux/modules/currentVideoSlice';

const DetailPageVideoArea = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const inform = useSelector((state) => state.seletcedVideoSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    // 'inform.id'를 기반으로 초기 'currentIndex' 설정
    const initialIndex = posts.findIndex((post) => post.id === inform.id);
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
    dispatch(currentVideoData(posts[currentIndex]));
  }, [inform.id, posts]);

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;

  const prevBtnClickHandler = () => {
    // TODO : 이전버튼 클릭시 재생목록의 이전노래 나오기
    // alert('이번버튼 클릭');
    // 'currentIndex'를 1 감소
    const newIndex = currentIndex - 1 < 0 ? posts.length - 1 : currentIndex - 1;
    console.log('pre', newIndex);
    setCurrentIndex(newIndex);
  };
  const nextBtnClickHandler = () => {
    // TODO : 다음버튼 클릭시 재생목록의 다음노래 나오기
    // alert('다음버튼 클릭');
    // 'currentIndex'를 1 증가
    const newIndex = (currentIndex + 1) % posts.length;
    console.log('next', newIndex);
    setCurrentIndex(newIndex);
  };

  // console.log('posts',currentVideoId)

  return (
    <StVideoSection>
      {/* video Id에 값 변경 시 영상 변경 */}
      <YouTube videoId={`${posts[currentIndex].videoId}`} style={{ width: '100%' }} opts={{ width: '100%' }} />
      <button onClick={prevBtnClickHandler}>
        <Prev />
      </button>
      <button onClick={nextBtnClickHandler}>
        <Next />
      </button>
    </StVideoSection>
  );
};

const StVideoSection = styled.section`
  position: relative;
  width: 100%;
  height: 25.5625rem;

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  & button {
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: -1.8rem;
    background: none;
    transform: translate(-100%, 0);
    color: #ff683b;
    padding: unset;
  }

  & button:last-child {
    left: unset;
    right: -1.8rem;
    transform: translate(100%, 0);
  }
`;

export default DetailPageVideoArea;
