import styled from 'styled-components';

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const StFavoriteGenre = styled.span`
  color: var(--violetColor);
  border: 1px solid var(--violetColor);
  padding: 0.4rem 0.8rem;
  border-radius: 5rem;
`;

const StUserSharedPostsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StPostCard = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const StThumnail = styled.img`
  background-color: orange;
  height: 10rem;
  width: 20rem;
`;

const StPostInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StPostTitle = styled.h2`
  color: #fff;
  font-size: 2.4rem;
`;

const StPostContent = styled.p`
  color: #fff;
  font-size: 1.4rem;
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
  StPostContent
};
