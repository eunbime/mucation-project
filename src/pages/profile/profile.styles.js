import styled from 'styled-components';

// 사용자 프로필 부분
const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  gap: 1rem;
`;

const StAvatar = styled.img`
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
`;

const StNickname = styled.h2`
  color: var(--mainOrange);
  font-size: 1.8rem;
`;

const StEmail = styled.p`
  font-size: 1rem;
  color: var(--mainWhite);
`;

const StIntroduce = styled.p`
  color: var(--mainWhite);
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.2;
`;

const StUserInteresteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StFavoriteGenre = styled.span`
  color: var(--violetColor);
  border: 1px solid var(--violetColor);
  padding: 0.4rem 0.8rem;
  border-radius: 3rem;
  /* border color  */

  & button {
    color: var(--violetColor);
    background-color: transparent;
  }
`;

// 사용자 게시물 부분
const StUserSharedPostsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const StPostCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.5rem;
  gap: 3rem;
  width: 50rem;
  background-color: var(--mainBlack);
  border-radius: 1rem;
`;

const StThumnail = styled.img`
  background-color: orange;
  height: 10rem;
  width: 18rem;
  border-radius: 0.8rem;
`;

const StPostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.875rem;

  & span {
    font-size: 0.875rem;
  }
`;

const StPostTitle = styled.h2`
  color: var(--mainWhite);
  font-size: 1.563rem;
`;

const StPostContent = styled.p`
  color: var(--mainWhite);
  font-size: 1rem;
`;

// 수정 프로필 모달
const StUserProfileEditModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StUserProfileEditModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const StUserProfilePhoto = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  cursor: pointer;
`;

const StFileUploadInput = styled.input``;

const StLabel = styled.label``;

const StInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  padding-bottom: 0.5625rem;
  border-bottom: 1px solid var(--mainWhite);
  outline: none;
  color: var(--mainWhite);

  &:focus {
    color: var(--mainOrange);
    border-color: var(--mainOrange);
    &::placeholder {
      color: var(--mainOrange);
    }
  }
`;

export {
  StUserInfoContainer,
  StAvatar,
  StNickname,
  StEmail,
  StIntroduce,
  StFavoriteGenre,
  StUserSharedPostsContainer,
  StPostCard,
  StThumnail,
  StPostInfoWrapper,
  StPostTitle,
  StPostContent,
  StUserProfileEditModalContainer,
  StUserProfileEditModalForm,
  StFileUploadInput,
  StUserProfilePhoto,
  StUserInteresteWrapper,
  StLabel,
  StInput
};
