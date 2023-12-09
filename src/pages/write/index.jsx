import React, { useEffect, useState } from 'react';
import WritePageTitle from './WritePageTitle';
import WritePageContext from './WritePageContext';
import WritePageMap from './WritePageMap';
import Button from 'components/common/Button';
import WritePageVideoArea from './WritePageVideoArea';
import { addPost, editPost } from '../../axios/firebaseApi.js';
import WriteModal from './WriteModal';
import { StWriteContainer, StWriteBtnArea } from './write.styles';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import useAlert from 'hooks/useAlert';

const Write = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams();

  const { alert, confirm } = useAlert();

  const { currentUser } = useAuth();

  const params = useParams();

  const mode = params.mode;

  // 동영상 선택시 선택된 동영상 정보 저장
  const [selectVideo, setSelectVideo] = useState({ videoId: '', thumbnail: '' });

  // 유저 입력 data
  const [inputValue, setInputValue] = useState({ title: '', context: '' });

  // 모달 토글 정보
  const [isOpen, setIsOpen] = useState(false);

  // 위치정보
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });

  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

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
  const cancelWriteHandler = async () => {
    const confirmValue = await confirm({ title: '작성취소', message: '작성을 취소하시겠습니까?' });
    if (!confirmValue) return;
    navigate('/');
  };

  // 작성 완료 이벤트
  const postWriteHandler = () => {
    // 새로운 데이터 묶음
    // TODO : 데이터 변경 필요
    // uid 데이터 추가 필요
    const newMusicPost = {
      date: new Date().getTime(), //serverTimestamp(),
      location: state.center,
      videoId: selectVideo.videoId,
      title: inputValue.title,
      context: inputValue.context,
      thumbnail: selectVideo.thumbnail,
      uid: currentUser.uid,
      userPhoto: currentUser.photoURL || 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png',
      nickname: currentUser.displayName
    };

    addPost(newMusicPost);
    alert({ title: '작성완료', message: '작성이 완료되었습니다.' });
    navigate('/');
  };

  // 업데이트시
  const postEditHandler = () => {
    const updateData = {
      location: state.center,
      videoId: selectVideo.videoId,
      title: inputValue.title,
      context: inputValue.context,
      thumbnail: selectVideo.thumbnail,
      userPhoto: currentUser.photoURL || 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png',
      nickname: currentUser.displayName
    };

    editPost({ id: query.id, data: updateData });
    alert({ title: '수정완료', message: '수정이 완료되었습니다.' });
    navigate('/');
  };

  // write 모드일 때 버튼 생성
  const WRITE_PAGE_WRITE_MODE_BUTTON = [
    { text: '취소하기', handler: cancelWriteHandler },
    { text: '등록하기', handler: postWriteHandler }
  ];

  // edit mode 일 떄 버튼
  const WRITE_PAGE_EDIT_MODE_BUTTON = [
    { text: '취소하기', handler: cancelWriteHandler },
    { text: '게시물 수정하기', handler: postEditHandler }
  ];

  const writeModeButton = WRITE_PAGE_WRITE_MODE_BUTTON.map((button, index) => (
    <Button key={index} text={button.text} handler={button.handler} />
  ));

  const editModeButton = WRITE_PAGE_EDIT_MODE_BUTTON.map((button, index) => (
    <Button key={index} text={button.text} handler={button.handler} />
  ));

  return (
    <StWriteContainer>
      {isOpen && <WriteModal setSelectVideo={setSelectVideo} selectVideo={selectVideo} toggleModal={toggleModal} />}
      <WritePageVideoArea selectVideo={selectVideo.videoId} toggleModal={toggleModal} />
      <WritePageTitle titleValue={inputValue.title} setTitleValue={setTitleValue} />
      <WritePageContext contextValue={inputValue.context} setContextValue={setContextValue} />
      <WritePageMap setState={setState} state={state} />
      <StWriteBtnArea>
        {mode === 'write' && writeModeButton}
        {mode === 'edit' && editModeButton}
      </StWriteBtnArea>
    </StWriteContainer>
  );
};

export default Write;
