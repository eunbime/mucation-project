import React, { useEffect, useState, useRef } from 'react';
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
import { useQuery } from 'react-query';
import { getUserInfo, profileUpdate } from '../../axios/firebaseApi.js';
import Button from 'components/common/Button';
import AlertModal from 'components/alertModal/AlertModal';
import useAlert from 'hooks/useAlert';
import { getDoc } from 'firebase/firestore';

const EditProfileModal = () => {
  const { currentUser } = useAuth();
  const {
    isLoading,
    isError,
    data: user
  } = useQuery({ queryKey: ['user'], queryFn: () => getUserInfo(currentUser.uid) });

  const [editUserIntroduction, setEditUserIntroduction] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editInterestGenre, setEditInterestGenre] = useState('');
  const [interestGenre, setInterestGenre] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = getDoc(doc(db, 'user', currentUser.uid));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setEditInterestGenre(userData.genre || []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);

  // 모달창 닫기
  const cancelEditProfile = () => {
    dispatch(isEditingUserProfile(false));
  };

  // 업데이트 사용자 프로필
  const editProfile = async (id) => {
    const docRef = doc(db, 'user', id);
    await updateDoc(docRef, {
      introduce: editUserIntroduction
    });

    await profileUpdate(editNickname);
    dispatch(isEditingUserProfile(false));
  };

  const addInterestGenre = async (id) => {
    if (!editInterestGenre) {
      alert({ title: '입력오류', message: '장르를 입력해 주세요.' });
      return;
    }

    const docRef = doc(db, 'user', id);
    const updatedGenre = [...interestGenre, editInterestGenre];
    setInterestGenre(updatedGenre);

    await updateDoc(docRef, {
      genre: arrayUnion(editInterestGenre)
    });
  };

  const deleteInterestGenre = async (id, item) => {
    const docRef = doc(db, 'user', id);
    const updatedGenre = interestGenre.filter((genre) => genre !== item);
    setInterestGenre(updatedGenre);
    await updateDoc(docRef, {
      genre: arrayRemove(item)
    });
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
      {interestGenre.length < 5 ? (
        <StAddGenreWrapper>
          <StInput
            type="text"
            placeholder="좋아하는 장르 (최대 5개)"
            defaultValue={editInterestGenre}
            onChange={userInterestGenreOnChange}
          />
          <button onClick={() => addInterestGenre(currentUser.uid)}>+</button>
        </StAddGenreWrapper>
      ) : (
        '좋아하는 장르는 최대 5개까지 입력할 수 있습니다. '
      )}
      <StUserInteresteWrapper>
        {/* {user?.genre.map((item) => (
          <StFavoriteGenre>
            {item} <button onClick={() => deleteInterestGenre(currentUser.uid, item)}>X</button>
          </StFavoriteGenre>
        ))} */}

        {user?.genre &&
          user.genre.map((item) => (
            <StFavoriteGenre>
              {item} <button onClick={() => deleteInterestGenre(currentUser.uid, item)}>X</button>
            </StFavoriteGenre>
          ))}
      </StUserInteresteWrapper>
      <StButtonWrapper>
        <Button text={'취소'} mode={'black'} handler={cancelEditProfile}></Button>
        <Button text={'수정'} handler={() => editProfile(currentUser.uid)}></Button>
      </StButtonWrapper>
    </StUserProfileEditModalContainer>
  );
};

export default EditProfileModal;
