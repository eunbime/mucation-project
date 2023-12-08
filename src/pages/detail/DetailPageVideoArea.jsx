import React from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { ReactComponent as Prev } from '../../styles/img/detailPage/arrow-left.svg';
import { ReactComponent as Next } from '../../styles/img/detailPage/arrow-right.svg';
const DetailPageVideoArea = () => {

  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);

  if (isLoading) return <p>loading...</p>;

  if (isError) return <p>{'오류가 발생했습니다 :('}</p>;



  const prevBtnClickHandler = () => {
    // TODO : 이전버튼 클릭시 재생목록의 이전노래 나오기
    alert('이번버튼 클릭');
  };
  const nextBtnClickHandler = () => {
    // TODO : 다음버튼 클릭시 재생목록의 다음노래 나오기
    alert('다음버튼 클릭');
  };
  return (
    <StVideoSection>
      {/* video Id에 값 변경 시 영상 변경 */}
      <YouTube videoId="ojU4lJ1t5Bw" style={{ width: '100%' }} opts={{ width: '100%' }} />
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
