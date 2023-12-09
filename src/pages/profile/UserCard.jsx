import {
  StUserInfoContainer,
  StAvatar,
  StNickname,
  StEmail,
  StIntroduce,
  StFavoriteGenre,
  StUserInteresteWrapper
} from './profile.styles';
import { useDispatch } from 'react-redux';
import { isEditingUserProfile } from '../../redux/modules/profileSlice.js';
import Button from 'components/common/Button';
import { getUserInfo } from '../../axios/firebaseApi.js';
import { useQuery } from 'react-query';
import { useAuth } from 'hooks/useAuth';

const UserCard = () => {
  const { isLoading, isError, data: user } = useQuery('user', getUserInfo);
  const currentUser = useAuth().currentUser;
  const dispatch = useDispatch();

  // 프로필 수정 모달 열기
  const showEditProfileModal = () => {
    dispatch(isEditingUserProfile(true));
  };

  return (
    <StUserInfoContainer>
      <StAvatar
        src={
          currentUser.photoURL
            ? currentUser.photoURL
            : 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png'
        }
      ></StAvatar>
      <StNickname>{currentUser.displayName ? currentUser.displayName : '이름없음'} </StNickname>
      <StEmail>{currentUser.email}</StEmail>

      {user?.map((member) => {
        return (
          <>
            <StIntroduce>{member.introduce}</StIntroduce>
            <StUserInteresteWrapper>
              {Array.from(member.interest).map((item) => {
                return <StFavoriteGenre>{item}</StFavoriteGenre>;
              })}
            </StUserInteresteWrapper>
          </>
        );
      })}

      <Button text="프로필 수정" handler={showEditProfileModal} />
    </StUserInfoContainer>
  );
};

export default UserCard;
