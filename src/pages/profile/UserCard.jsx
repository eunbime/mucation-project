import {
  StUserInfoContainer,
  StAvatar,
  StNickname,
  StEmail,
  StIntroduce,
  StFavoriteGenre,
  StUserInteresteWrapper
} from './profile.styles';
import { useDispatch, useSelector } from 'react-redux';
import { isEditingUserProfile } from '../../redux/module/auth.js';
import Button from 'components/common/Button';

const UserCard = () => {
  const dispatch = useDispatch();
  const { nickname, email, avatar, uid, userIntro, userInterest } = useSelector((state) => state.auth);
  const userInterestArr = Array.from(userInterest); //

  const showEditProfileModal = () => {
    // 프로필 수정 모달 열기
    dispatch(isEditingUserProfile(true));

    // 파이어베이스 데이터 업데이트 자리
  };

  return (
    <StUserInfoContainer key={uid}>
      <StAvatar
        src={avatar === null ? 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png' : avatar}
      ></StAvatar>
      <StNickname>{nickname === null ? '이름없음' : nickname}</StNickname>
      <StEmail>{email}</StEmail>
      <StIntroduce>{userIntro}</StIntroduce>
      <StUserInteresteWrapper>
        {userInterestArr.map((item) => {
          return <StFavoriteGenre>{item}</StFavoriteGenre>;
        })}
      </StUserInteresteWrapper>

      <Button text="프로필 수정" handler={() => showEditProfileModal(uid)} />
    </StUserInfoContainer>
  );
};

export default UserCard;
