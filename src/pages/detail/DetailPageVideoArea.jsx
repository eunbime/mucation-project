import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { ReactComponent as Prev } from '../../styles/img/detailPage/arrow-left.svg';
import { ReactComponent as Next } from '../../styles/img/detailPage/arrow-right.svg';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { useDispatch, useSelector } from 'react-redux';
import { currentVideoData } from '../../redux/modules/currentVideoSlice';
import { selectedvideo } from '../../redux/modules/seletcedVideoSlice';
import { StVideoSection } from './Detail.styles';

const DetailPageVideoArea = () => {
  const dispatch = useDispatch();

  const inform = useSelector((state) => state.seletcedVideoSlice);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);

  useEffect(() => {
    // 'inform.id'를 기반으로 초기 'currentIndex' 설정
    const initialIndex = posts?.findIndex((post) => post.id === inform.id);
    setCurrentIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [inform.id, posts]);

  useEffect(() => {
    dispatch(currentVideoData(posts?.[currentIndex]));
  }, [currentIndex, posts]);

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;

  const prevBtnClickHandler = () => {
    // alert('이번버튼 클릭');
    // 'currentIndex'를 1 감소
    const newIndex = currentIndex - 1 < 0 ? posts.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    dispatch(selectedvideo(posts[newIndex]));
  };

  const nextBtnClickHandler = () => {
    // alert('다음버튼 클릭');
    // 'currentIndex'를 1 증가
    const newIndex = (currentIndex + 1) % posts.length;
    setCurrentIndex(newIndex);
    dispatch(selectedvideo(posts[newIndex]));
  };

  return (
    <>
      <StVideoSection>
        <YouTube videoId={`${posts[currentIndex].videoId}`} style={{ width: '100%' }} opts={{ width: '100%' }} />
        <button onClick={prevBtnClickHandler}>
          <Prev />
        </button>
        <button onClick={nextBtnClickHandler}>
          <Next />
        </button>
      </StVideoSection>
    </>
  );
};

export default DetailPageVideoArea;
