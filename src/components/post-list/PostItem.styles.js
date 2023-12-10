import styled from 'styled-components';

const StPostItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  background-color: var(--subColor);
  padding: 1.25rem;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    background-color: #4a4a4a;
  }

  @media (min-width: 650px) {
    flex-direction: row;
    gap: 3rem;
  }
`;

const StThumbnailBox = styled.div`
  width: 100%;
  transition: all 0.3s ease-in-out;

  @media (min-width: 650px) {
    height: 140px;
    width: 250px;
  }

  @media (min-width: 1050px) {
    height: 250px;
    width: 450px;
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
  gap: 1rem;
  padding: 1rem 0;
  transition: all 0.3s ease-in-out;

  > p {
    font-size: medium;
    padding: 0.5rem;

    @media (min-width: 650px) {
      font-size: small;
    }

    @media (min-width: 1050px) {
      font-size: medium;
    }
  }

  @media (min-width: 1050px) {
    gap: 2rem;
  }
`;

const StUserInfo = styled.section`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const StPostTitle = styled.h3`
  font-size: x-large;

  @media (min-width: 650px) {
    font-size: large;
  }

  @media (min-width: 1050px) {
    font-size: x-large;
  }
`;

const UserProfile = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: gray;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  & img {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 1050px) {
    width: 3rem;
    height: 3rem;
  }
`;

const StNicknameAndDate = styled.div`
  display: flex;
  align-items: center;
  font-size: small;
  padding-left: 0.5rem;
  &::after {
    content: '|';
    float: right;
    display: block;
    color: #666;
    padding-left: 0.8rem;
  }
  &:last-child::after {
    content: '';
  }

  @media (min-width: 1050px) {
    font-size: large;
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
