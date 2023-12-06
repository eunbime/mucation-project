import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import WritePageTitle from './WritePageTitle';
import WritePageContext from './WritePageContext';
import WritePageMap from './WritePageMap';
import Button from 'components/common/Button';
import WritePageVideoArea from './WritePageVideoArea';

const Write = () => {
  // 동영상 선택시 선택된 동영상 정보 저장
  const [selectVideo, setSelectVideo] = useState('udkrTgTMucQ');

  // 유저 입력 data
  const [inputValue, setInputValue] = useState({ title: '', context: '' });

  // set User input
  const setTitleValue = (e) => {
    setInputValue((prev) => {
      return { ...prev, title: e.target.value };
    });
  };

  // set User textarea
  const setContextValue = (e) => {
    setInputValue((prev) => {
      return { ...prev, context: e.target.value };
    });
  };

  // 동영상 선택 모달 오픈
  const selectVideoModalOpenHandler = () => {
    // TODO : 병택님 모달 오픈 해주세요~
    // selectVideo/setSelectVideo 사용하세요~
    alert('모달 오픈!');
  };

  // 작성 취소 이벤트
  const cancelWriteHandler = () => {
    if (!window.confirm('정말 작성을 취소하시겠습니까?')) return;

    // TODO : 작성 취소 후 메인페이지로 전환 필요
    alert('작성 취소!');
  };

  // 작성 완료 이벤트
  const postWriteHandler = () => {
    // 새로운 데이터 묶음
    // TODO : 데이터 변경 필요
    // location => map에서 가져온 위치정보 들어가야함
    // videoUrl => 영상 정보에서 Url 정보를 추출해서 넣어야함
    const newMusicPost = {
      ...inputValue,
      id: uuidv4(),
      date: new Date().getTime(),
      location: '',
      videoUrl: selectVideo
    };

    // TODO : post event 추가 필요
    alert('작성 완료!');
  };

  // 작성 버튼 생성
  const WRITE_PAGE_BUTTON = [
    { text: '취소하기', handler: cancelWriteHandler },
    { text: '등록하기', handler: postWriteHandler }
  ];

  const writePageButton = WRITE_PAGE_BUTTON.map((button) => <Button text={button.text} handler={button.handler} />);

  return (
    <StWritePageContainer>
      <WritePageVideoArea selectVideo={selectVideo} selectVideoModalOpenHandler={selectVideoModalOpenHandler} />
      <WritePageTitle titleValue={inputValue.title} setTitleValue={setTitleValue} />
      <WritePageContext contextValue={inputValue.context} setContextValue={setContextValue} />
      <WritePageMap />
      <StWritePageBtnArea>{writePageButton}</StWritePageBtnArea>
    </StWritePageContainer>
  );
};

const StWritePageContainer = styled.div`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: auto;
`;

const StWritePageBtnArea = styled.div`
  margin-bottom: 1rem;
  & button {
    margin: 0 1rem;
  }
`;

export default Write;
