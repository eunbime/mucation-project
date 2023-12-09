import React, { useEffect, useState, useRef } from 'react';
import {
  StUserProfileEditModalContainer,
  StUserProfileEditModalForm,
  StFileUploadInput,
  StUserProfilePhoto,
  StFavoriteGenre,
  StLabel,
  StInput,
  StUserInteresteWrapper
} from './EditProfileModal.styles';
import { useDispatch } from 'react-redux';
import { isEditingUserProfile } from '../../redux/modules/profileSlice.js';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { getUserInfo, profileUpdate } from '../../axios/firebaseApi.js';

const EditProfileModal = () => {
  const { isLoading, isError, data: user } = useQuery('user', getUserInfo);
  const [editUserIntroduction, setEditUserIntroduction] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editUserInterest, setEditUserInterest] = useState('');
  // const [selectedImg, setSelectedImg] = useState(user.avatar);
  // const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useAuth().currentUser;

  const userIntroOnChange = (e) => {
    setEditUserIntroduction(e.target.value);
  };

  const userInterestOnChange = (e) => {
    setEditUserInterest(e.target.value);
  };

  const onChangeNickname = (e) => {
    setEditNickname(e.target.value);
  };

  // 모달창 닫기
  const cancelEditProfile = () => {
    dispatch(isEditingUserProfile(false));
  };

  // 업데이트 사용자 프로필
  const editProfile = async (id) => {
    const docRef = doc(db, 'user', id);
    await updateDoc(docRef, {
      nickname: editNickname,
      introduce: editUserIntroduction,
      interest: arrayUnion(editUserInterest),
      avatar: currentUser.photoURL,
      email: currentUser.email
    });

    await profileUpdate(editNickname);
    dispatch(isEditingUserProfile(false));
  };

  const onClickDeleteInterest = async (id, item) => {
    const docRef = doc(db, 'user', id);
    await updateDoc(docRef, {
      interest: arrayRemove(item)
    });
  };

  // const inputRef = useRef(null);
  // const previewImg = (event) => {
  //   const imgFile = event.target.files[0];
  //   if (imgFile.size > 1024 * 1024) {
  //     return alert('최대 1MB까지 업로드 가능합니다.');
  //   }
  //   setFile(imgFile);
  //   const imgUrl = URL.createObjectURL(imgFile);
  //   setSelectedImg(imgUrl);
  // };
  // const onClickImage = () => {
  //   inputRef.current?.click();
  // };

  return (
    <StUserProfileEditModalContainer>
      {user?.map((member) => {
        return (
          <>
            <StUserProfileEditModalForm>
              {/* <StUserProfilePhoto size="large" src={selectedImg} onClick={onClickImage} />
              <input hidden type="file" onChange={previewImg} accept="image/jpg, image/png" ref={inputRef} /> */}

              <StLabel htmlFor=""></StLabel>
              <StInput
                type="text"
                id="nickname"
                name="nickname"
                placeholder="닉네임(최대 5-10 글자)"
                defaultValue={member.nickname}
                onChange={onChangeNickname}
                maxLength={10}
              />
              <StLabel htmlFor=""></StLabel>
              <StInput
                type="text"
                placeholder="한줄 소개(최대 15-25글자)"
                defaultValue={member.introduce}
                onChange={userIntroOnChange}
                maxLength={25}
              />

              <div>
                <StInput
                  type="text"
                  placeholder="관심사 입력(최대5개)"
                  defaultValue={editUserInterest}
                  onChange={userInterestOnChange}
                />
              </div>
            </StUserProfileEditModalForm>

            {user?.map((member) => {
              const interestarr = Array.from(member.interest);
              return (
                <>
                  <StUserInteresteWrapper>
                    {interestarr.map((item) => {
                      return (
                        <StFavoriteGenre>
                          {item} <button onClick={() => onClickDeleteInterest(member.id, item)}>X</button>
                        </StFavoriteGenre>
                      );
                    })}
                  </StUserInteresteWrapper>
                </>
              );
            })}
            <button onClick={cancelEditProfile}>취소</button>
            <button onClick={() => editProfile(member.id)}>수정완료</button>
          </>
        );
      })}
    </StUserProfileEditModalContainer>
  );
};

export default EditProfileModal;
