import { useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { StUserInfoContainer, StAvatar, StNickname, StEmail, StIntroduce, StFavoriteGenre } from './profile.styles';

const UserCard = () => {
  const firebaseUID = localStorage.getItem('uid');
  const [userInfo, setUserInfo] = useState([]);

  // auth에 한줄 소개와 관심분야를 넣을 수 없어서 firestore에 유저에 대한 모든 정보 저장하고 프로필 업데이트 기능 진행.
  // 단, 현재 사용자의 uid와 firebase에 저장된 uid가 같아야 함.

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const q = query(collection(db, 'user'));
        const querySnapshot = await getDocs(q);

        const currentUser = [];
        querySnapshot.forEach((user) => {
          const data = user.data();
          currentUser.push(data);
        });
        setUserInfo(currentUser?.filter((el) => el.uid === firebaseUID));
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  console.log(userInfo);

  return (
    <div>
      {userInfo.map((user) => {
        return (
          <StUserInfoContainer>
            <StAvatar
              src={
                user.avatar === '' ? 'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png' : user.avatar
              }
            ></StAvatar>
            <StNickname>{user.nickname === '' ? '이름없음' : user.nickname}</StNickname>
            <StEmail>{user.email}</StEmail>
            <StIntroduce>{user.introduce}</StIntroduce>
            {/* 관심 장르 배열로 가져와야 함 */}
            <StFavoriteGenre>{user.interest}</StFavoriteGenre>
            <button>프로필 수정</button>
          </StUserInfoContainer>
        );
      })}
    </div>
  );
};

export default UserCard;
