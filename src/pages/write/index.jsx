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
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';

const Write = () => {
  const navigate = useNavigate();

  const { alert, confirm } = useAlert();

  const params = useParams();

  // 모드 선택 : write(글작성) / edit(수정)
  const mode = params.mode;

  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);

  // 수정모드 : 쿼리스트링을 통한 아이디값 가져오기
  // 형태> /write/edit?id=게시물 아이디
  const [query] = useSearchParams();

  // 동영상 선택시 선택된 동영상 정보 저장
  const [selectVideo, setSelectVideo] = useState(
    mode === 'edit' ? { videoId: datas?.videoId, thumbnail: datas?.thumbnail } : { videoId: '', thumbnail: '' }
  );

  // 유저 입력 data
  const [inputValue, setInputValue] = useState(
    mode === 'edit' ? { title: datas?.title, context: datas?.context } : { title: '', context: '' }
  );

  // 모달 토글 정보
  const [isOpen, setIsOpen] = useState(false);

  // 위치정보
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });

  const { mutate: addMutate } = useMutation({ mutationFn: addPost });
  const { mutate: editMutate } = useMutation({ mutationFn: editPost });

  const { checkAuth, currentUser } = useAuth();
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

    if (!selectVideo.videoId || !inputValue.title || !inputValue.context) {
      alert({ title: '입력오류', message: '모든 값을 입력해주세요' });
      return;
    }

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

    addMutate(newMusicPost, {
      onSuccess: () => {
        alert({ title: '작성완료', message: '작성이 완료되었습니다.' });
        navigate('/');
      }
    });
  };

  // 업데이트시
  const postEditHandler = () => {
    if (!selectVideo.videoId || !inputValue.title || !inputValue.context) {
      alert({ title: '입력오류', message: '모든 값을 입력해주세요' });
      return;
    }

    if (
      selectVideo.videoId === datas?.videoId &&
      inputValue.title === datas?.title &&
      inputValue.context === datas?.context &&
      state.center === datas?.location
    ) {
      alert({ title: '수정오류', message: '변경된 값이 없습니다.' });
      return;
    }

    const updateData = {
      location: state.center,
      videoId: selectVideo.videoId,
      title: inputValue.title,
      context: inputValue.context,
      thumbnail: selectVideo.thumbnail,
      userPhoto: currentUser.photoURL || 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png',
      nickname: currentUser.displayName
    };

    editMutate(
      { id: query.get('id'), data: updateData },
      {
        onSuccess: () => {
          alert({ title: '수정완료', message: '수정이 완료되었습니다.' });
          navigate('/');
        }
      }
    );
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
      <WritePageMap mode={mode} setState={setState} state={state} />
      <StWriteBtnArea>
        {mode === 'write' && writeModeButton}
        {mode === 'edit' && editModeButton}
      </StWriteBtnArea>
    </StWriteContainer>
  );
};

export default Write;
