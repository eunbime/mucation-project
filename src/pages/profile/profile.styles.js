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
  gap: 3rem;

  @media (max-width: 1050px) {
    width: 90%;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const StPostCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.5rem;
  gap: 2.5rem;
  width: 100%;
  background-color: var(--mainBlack);
  border-radius: 1rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const StThumnailAndInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const StThumnail = styled.img`
  background-color: orange;
  height: 14rem;
  width: 22rem;
  border-radius: 0.8rem;

  @media (max-width: 768px) {
    width: 39rem;
    height: 22rem;
  }
  @media (max-width: 732px) {
    width: 35rem;
    height: 20rem;
  }
  @media (max-width: 625px) {
    width: 30rem;
    height: 20rem;
  }
  @media (max-width: 580px) {
    width: 28rem;
    height: 20rem;
  }
  @media (max-width: 540px) {
    width: 26rem;
    height: 20rem;
  }
  @media (max-width: 414px) {
    width: 21rem;
    height: 15rem;
  }
  @media (max-width: 390px) {
    width: 19rem;
    height: 13rem;
  }
`;

const StPostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.875rem;
  @media (max-width: 768px) {
    width: 80%;
    align-items: center;
  }

  & span {
    font-size: 0.875rem;
    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }
`;

const StPostTitle = styled.h2`
  color: var(--mainWhite);
  font-size: 1.563rem;
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StPostContent = styled.p`
  color: var(--mainWhite);
  font-size: 1rem;
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
  StUserInteresteWrapper,
  StThumnailAndInfo
};
