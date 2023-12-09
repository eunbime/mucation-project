import React, { useEffect, useState } from 'react';
import {
  StUserProfileEditModalContainer,
  StUserProfileEditModalForm,
  StUserProfilePhoto,
  StFavoriteGenre,
  StLabel,
  StInput,
  StUserInteresteWrapper,
  StAddGenreWrapper,
  StButtonWrapper
} from './EditProfileModal.styles';
import { useDispatch } from 'react-redux';
import { isEditingUserProfile } from '../../redux/modules/profileSlice.js';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { useAuth } from 'hooks/useAuth';
import { getUserInfo, profileUpdate } from '../../axios/firebaseApi.js';
import Button from 'components/common/Button';
import AlertModal from 'components/alertModal/AlertModal';
import useAlert from 'hooks/useAlert';
import { getDoc } from 'firebase/firestore';
import { useQueryClient, useQuery, useMutation } from 'react-query';

const EditProfileModal = () => {
  const { currentUser } = useAuth();

  const {
    isLoading,
    isError,
    data: user
  } = useQuery({ queryKey: ['user'], queryFn: () => getUserInfo(currentUser.uid) });

  const queryClient = useQueryClient();
  const [editUserIntroduction, setEditUserIntroduction] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editInterestGenre, setEditInterestGenre] = useState('');
  const dispatch = useDispatch();
  const { alert } = useAlert();

  const onChangeNickname = (e) => {
    setEditNickname(e.target.value);
  };

  const userIntroOnChange = (e) => {
    setEditUserIntroduction(e.target.value);
  };

  const userInterestGenreOnChange = (e) => {
    setEditInterestGenre(e.target.value);
  };

  // 모달창 닫기
  const cancelEditProfile = () => {
    dispatch(isEditingUserProfile(false));
  };

  // 업데이트 사용자 프로필
  const editProfile = async (id) => {
    const docRef = doc(db, 'user', String(id));
    try {
      await updateDoc(docRef, {
        introduce: editUserIntroduction
      });
    } catch (err) {
      console.log(err);
    }

    await profileUpdate(editNickname);
    dispatch(isEditingUserProfile(false));
  };

  // 업데이트 사용자 프로필(react-query)
  const editMutaition = useMutation(editProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      // console.log('성공');
    }
  });

  // 업데이트 사용자 프로필 버튼 클릭
  const onClickEdit = (id) => {
    console.log(id);
    editMutaition.mutate(editProfile(String(id)));
  };

  // 관심 장르 추가
  const addInterestGenre = async (id) => {
    // 유효성 부분
    console.log(id);
    if (!editInterestGenre) {
      alert({ title: '입력오류', message: '장르를 입력해 주세요.' });
      return;
    }

    // 업데이트 부분
    const docRef = doc(db, 'user', String(id));
    try {
      await updateDoc(docRef, {
        genre: arrayUnion(editInterestGenre)
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 관심 장르 추가(react-query)
  const addGenreMutaition = useMutation(addInterestGenre, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      // console.log('성공');
    }
  });

  // 관심 장르 추가 버튼
  const handleAdd = (id) => {
    addGenreMutaition.mutate(addInterestGenre(id));
  };

  // 관심 장르 삭제
  const deleteInterestGenre = async (id, item) => {
    const docRef = doc(db, 'user', String(id));

    try {
      await updateDoc(docRef, {
        genre: arrayRemove(item)
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 관심 장르 삭제(react-query)
  const deleteMutation = useMutation(deleteInterestGenre, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      console.log('삭제성공');
    }
  });

  // 관심 장르 삭제 버튼
  const handleDelete = (id, item) => {
    console.log(id);
    deleteMutation.mutate(deleteInterestGenre(id, item));
  };

  return (
    <StUserProfileEditModalContainer>
      <StUserProfileEditModalForm>
        <StLabel htmlFor=""></StLabel>
        <StInput
          type="text"
          id="nickname"
          name="nickname"
          placeholder="닉네임(최대 5-10 글자)"
          defaultValue={currentUser.displayName}
          onChange={onChangeNickname}
          maxLength={10}
        />
        <StLabel htmlFor=""></StLabel>
        <StInput
          type="text"
          placeholder="한줄 소개(최대 15-25글자)"
          defaultValue={user?.introduce}
          onChange={userIntroOnChange}
          maxLength={25}
        />
      </StUserProfileEditModalForm>
      {user.genre.length < 5 ? (
        <StAddGenreWrapper>
          <StInput
            type="text"
            placeholder="좋아하는 장르 (최대 5개)"
            defaultValue={editInterestGenre}
            onChange={userInterestGenreOnChange}
          />
          <button onClick={() => handleAdd(currentUser.uid)}>+</button>
        </StAddGenreWrapper>
      ) : (
        '좋아하는 장르는 최대 5개까지 입력할 수 있습니다. '
      )}
      <StUserInteresteWrapper>
        {user?.genre.map((item) => (
          <StFavoriteGenre>
            {' '}
            {item} <button onClick={() => handleDelete(currentUser.uid, item)}>X</button>
          </StFavoriteGenre>
        ))}
      </StUserInteresteWrapper>
      <StButtonWrapper>
        <Button text={'취소'} mode={'black'} handler={cancelEditProfile}></Button>
        <Button text={'수정'} handler={() => onClickEdit(currentUser.uid)}></Button>
      </StButtonWrapper>
    </StUserProfileEditModalContainer>
  );
};

export default EditProfileModal;
