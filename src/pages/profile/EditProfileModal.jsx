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
  StButtonWrapper,
  StImageUploadInput,
  StImageButtonValue,
  StImageUploadContainer,
  StImageUploadButton
} from './EditProfileModal.styles';
import { useDispatch } from 'react-redux';
import { isEditingUserProfile } from '../../redux/modules/profileSlice.js';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, storage } from '../../firebase.js';
import { useAuth } from 'hooks/useAuth';
import { getUserInfo, userProfileUpdate } from '../../axios/firebaseApi.js';
import Button from 'components/common/Button';
import AlertModal from 'components/alertModal/AlertModal';
import useAlert from 'hooks/useAlert';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const EditProfileModal = () => {
  const { currentUser } = useAuth();
  const { data: user } = useQuery({ queryKey: ['user'], queryFn: () => getUserInfo(currentUser.uid) });

  const queryClient = useQueryClient();
  const [editUserIntroduction, setEditUserIntroduction] = useState('');
  const [editNickname, setEditNickname] = useState('');
  const [editInterestGenre, setEditInterestGenre] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState('');

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

    // 수정된 닉네임과 소개글 모두 없으면
    if (!editNickname && !editUserIntroduction && !imageUpload && !editInterestGenre) {
      alert({ title: '프로필 수정', message: '수정 사항이 없습니다.' });
      dispatch(isEditingUserProfile(false));
      // 원래 저장되어 있던 닉네임도 유지함
      setEditNickname(currentUser.displayName);
      // 원래 저장되어 있던 소개글을 유지함
      setEditUserIntroduction(user.introduce);
      return;
    }
    // 닉네임만 수정되고 소개들이 수정되지 않았을 때
    if (editNickname && !editUserIntroduction) {
      await userProfileUpdate(editNickname);
      alert({ title: '수정완료', message: '닉네임이 수정되었습니다.' });
      dispatch(isEditingUserProfile(false));
      setEditNickname(editNickname);
      setEditUserIntroduction(user.introduce);
    }
    // 닉네임은 바뀌지 않고 소개글만 수정되었을 때
    if (!editNickname && editUserIntroduction) {
      alert({ title: '수정완료', message: '한줄 소개가 수정되었습니다.' });
      dispatch(isEditingUserProfile(false));
      setEditNickname(currentUser.displayName);
      setEditUserIntroduction(editUserIntroduction);
      try {
        await updateDoc(docRef, {
          introduce: editUserIntroduction
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (editNickname && editUserIntroduction) {
      alert({ title: '수정완료', message: '프로필이 성공적으로 수정되었습니다.' });
      dispatch(isEditingUserProfile(false));
      setEditNickname(editNickname);
      setEditUserIntroduction(editUserIntroduction);
      try {
        await userProfileUpdate(editNickname);
        await updateDoc(docRef, {
          introduce: editUserIntroduction
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (imageUpload) {
      alert({ title: '수정완료', message: '프로필이 성공적으로 수정되었습니다.' });
      dispatch(isEditingUserProfile(false));
    }
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
    setEditInterestGenre('');
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

  // 이미지 업로드 되었을 때 리렌더링
  useEffect(() => {
    const imageRef = ref(storage, `images/${currentUser.uid}`); // storage directory (path, file name)
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        console.log(url);
      });
    });

    userProfileUpdate(currentUser.displayName, image);
  }, [imageUpload]);

  const onClickUpload = (e) => {
    e.preventDefault();
    const imageRef = ref(storage, `images/${currentUser.uid}`); // storage directory (path, file name)
    if (!imageUpload) return;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
        alert({ title: '업로드 성공', message: '프로필 사진이 성공적으로 업로드 되었습니다.' });
      });
    });

    userProfileUpdate(currentUser.displayName, image);
  };

  return (
    <StUserProfileEditModalContainer>
      <StUserProfileEditModalForm>
        <StUserProfilePhoto src={currentUser.photoURL} />

        <StImageUploadContainer>
          <label htmlFor="file">
            <StImageButtonValue>사진선택</StImageButtonValue>
          </label>
          <StImageUploadInput
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          ></StImageUploadInput>
          <StImageUploadButton onClick={onClickUpload}>업로드</StImageUploadButton>
        </StImageUploadContainer>

        <StLabel htmlFor="nickname"></StLabel>
        <StInput
          type="text"
          id="nickname"
          name="nickname"
          placeholder="닉네임(최대 5-10 글자)"
          defaultValue={currentUser.displayName}
          onChange={onChangeNickname}
          maxLength={10}
        />
        <StLabel htmlFor="userIntroduce"></StLabel>
        <StInput
          type="text"
          id="userIntroduce"
          name="userIntroduce"
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
            value={editInterestGenre}
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
