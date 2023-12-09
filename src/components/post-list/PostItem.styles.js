import styled from 'styled-components';

const StPostItemWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  width: 100%;
  background-color: var(--subColor);
  padding: 1.25rem;
  transition: all 0.3s ease-in-out;

  @media (min-width: 650px) {
    height: 330px;
  }
`;

const StThumbnailBox = styled.div`
  width: 100%;
  transition: all 0.3s ease-in-out;

  @media (min-width: 650px) {
    height: 100%;
    width: 520px;
  }
`;

const StThumbnailImg = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;

const StInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem 0;
  > p {
    font-size: small;
    padding: 0.5rem;
  }
`;

const StUserInfo = styled.section`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StPostTitle = styled.h3`
  font-size: xx-large;
`;

const UserProfile = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: gray;
  border-radius: 50%;
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const StNicknameAndDate = styled.div`
  font-size: large;
  &::after {
    content: '|';
    float: right;
    display: block;
    color: #666;
  }
  &:last-child::after {
    content: '';
  }
`;

export {
  StPostItemWrapper,
  StThumbnailBox,
  StThumbnailImg,
  StInfoBox,
  StPostTitle,
  StUserInfo,
  UserProfile,
  StNicknameAndDate
};
