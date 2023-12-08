import React, { useState } from 'react';
import {
  StUserProfileEditModalContainer,
  StUserProfileEditModalForm,
  StFileUploadInput,
  StUserProfilePhoto,
  StLabel,
  StInput,
  StUserInteresteWrapper
} from './profile.styles';
import { useDispatch, useSelector } from 'react-redux';
import { isEditingUserProfile } from '../../redux/modules/profileSlice.js';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { auth } from '../../firebase.js';

const EditProfileModal = () => {
  const [editUserIntroduction, setEditUserIntroduction] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editUserInterest, setEditUserInterest] = useState([]);
  const dispatch = useDispatch();
  const user = auth.currentUser;

  const userIntroOnChange = (e) => {
    setEditUserIntroduction(e.target.value);
  };

  const userInterestOnChange = (e) => {
    setEditUserInterest(e.target.value);
  };

  const onChangeNickname = (e) => {
    setEditNickname(e.target.value);
  };

  const cancelEditProfile = () => {
    dispatch(isEditingUserProfile(false));
  };

  const onClickEditProfile = async (id) => {
    const docRef = doc(db, 'user', 'XJnHOiQuDAeTWFlFbX5P');
    await updateDoc(docRef, {
      nickname: editNickname,
      introduce: editUserIntroduction
    });

    dispatch(isEditingUserProfile(false));
  };

  const addUserInterest = (e) => {
    e.preventDefault();
  };

  return (
    <StUserProfileEditModalContainer>
      <StUserProfileEditModalForm>
        <StUserProfilePhoto
          src={
            user.photoURL === null
              ? 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png'
              : user.photoURL
          }
        ></StUserProfilePhoto>
        {/* <StFileUploadInput type="file" /> */}
        <StLabel htmlFor=""></StLabel>
        <StInput
          type="text"
          placeholder="닉네임(최대 5-10 글자)"
          defaultValue={user.displayName}
          onChange={onChangeNickname}
          maxLength={10}
        />
        <StLabel htmlFor=""></StLabel>
        <StInput
          type="text"
          placeholder="한줄 소개(최대 15-25글자)"
          // defaultValue={userIntro}
          onChange={userIntroOnChange}
          maxLength={25}
        />

        {/* <StUserInteresteWrapper>
          {useInterestArr.map((item) => {
            return (
              <span>
                {item} <button onClick={removeUserInterest}>X</button>
              </span>
            );
          })}
        </StUserInteresteWrapper> */}

        <div>
          <StInput
            type="text"
            placeholder="관심사 입력(최대5개)"
            defaultValue={editUserInterest}
            onChange={userInterestOnChange}
          />
          <button onClick={addUserInterest}>관심사 추가</button>
        </div>
      </StUserProfileEditModalForm>
      <button onClick={cancelEditProfile}>취소</button>
      <button onClick={onClickEditProfile}>수정완료</button>
    </StUserProfileEditModalContainer>
  );
};

export default EditProfileModal;
