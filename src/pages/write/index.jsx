import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WritePageTitle from './WritePageTitle';
import WritePageContext from './WritePageContext';
import WritePageMap from './WritePageMap';
import Button from 'components/common/Button';
import WritePageVideoArea from './WritePageVideoArea';
import { addPost } from '../../axios/firebaseApi.js';
import WriteModal from './WriteModal';
import { StWriteContainer, StWriteBtnArea } from './write.styles';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Write = () => {
  const navigate = useNavigate();

  // 동영상 선택시 선택된 동영상 정보 저장
  const [selectVideo, setSelectVideo] = useState({ videoId: '', thumbnail: '' });

  // 유저 입력 data
  const [inputValue, setInputValue] = useState({ title: '', context: '' });

  // 모달 토글 정보
  const [isOpen, setIsOpen] = useState(false);

  // 위치정보
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });

  // 동영상 선택 모달 토글
  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

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

  // 작성 취소 이벤트
  const cancelWriteHandler = () => {
    if (!window.confirm('정말 작성을 취소하시겠습니까?')) return;

    navigate('/');
  };

// auth.current 정보 가져오기
const nickname = auth.currentUser
console.log('write',nickname);


  // 작성 완료 이벤트
  const postWriteHandler = () => {
    // 새로운 데이터 묶음
    // TODO : 데이터 변경 필요
    // uid 데이터 추가 필요
    const newMusicPost = {
      // id: uuidv4(),
      date: new Date().getTime(),
      location: state.center,
      videoId: selectVideo.videoId,
      uid: 'BwccmAjZk7VOb4oi0FUYr7jPeps1',
      title: inputValue.title,
      context: inputValue.context,
      thumbnail: selectVideo.thumbnail,
      nickname : nickname,
    };

    addPost(newMusicPost);

    navigate('/');
  };

  // 작성 버튼 생성
  const WRITE_PAGE_BUTTON = [
    { text: '취소하기', handler: cancelWriteHandler },
    { text: '등록하기', handler: postWriteHandler }
  ];

  const writePageButton = WRITE_PAGE_BUTTON.map((button, index) => (
    <Button key={index} text={button.text} handler={button.handler} />
  ));

  return (
    <StWriteContainer>
      {isOpen && <WriteModal setSelectVideo={setSelectVideo} selectVideo={selectVideo} toggleModal={toggleModal} />}
      <WritePageVideoArea selectVideo={selectVideo.videoId} toggleModal={toggleModal} />
      <WritePageTitle titleValue={inputValue.title} setTitleValue={setTitleValue} />
      <WritePageContext contextValue={inputValue.context} setContextValue={setContextValue} />
      <WritePageMap setState={setState} state={state} />
      <StWriteBtnArea>{writePageButton}</StWriteBtnArea>
    </StWriteContainer>
  );
};

export default Write;
