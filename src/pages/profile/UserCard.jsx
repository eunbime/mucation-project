import {
  StUserInfoContainer,
  StAvatar,
  StNickname,
  StEmail,
  StIntroduce,
  StUserInteresteWrapper
} from './profile.styles';
import { useDispatch, useSelector } from 'react-redux';
import { isEditingUserProfile } from '../../redux/modules/profileSlice.js';
import Button from 'components/common/Button';
import { auth } from '../../firebase.js';

const UserCard = () => {
  const dispatch = useDispatch();
  const showEditProfileModal = () => {
    // 프로필 수정 모달 열기
    dispatch(isEditingUserProfile(true));
  };

  const user = auth.currentUser;

  return (
    <StUserInfoContainer>
      <StAvatar
        src={user.photoURL ? user.photoURL : 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png'}
      ></StAvatar>
      <StNickname>{user.displayName ? user.displayName : '이름없음'} </StNickname>
      <StEmail>{user.email}</StEmail>
      {/* <StIntroduce>{userIntro}</StIntroduce> */}
      {/* <StUserInteresteWrapper>
        {userInterestArr.map((item) => {
          return <StFavoriteGenre>{item}</StFavoriteGenre>;
        })}
       </StUserInteresteWrapper> */}
      <Button text="프로필 수정" handler={showEditProfileModal} />
    </StUserInfoContainer>
  );
};

export default UserCard;
