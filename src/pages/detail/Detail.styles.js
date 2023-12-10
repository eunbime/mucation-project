import styled from 'styled-components';

const StDetailPageWrapper = styled.div`
  max-width: 65.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  padding-top: 7.4375rem;
  color: var(--mainWhite);
  @media (max-width: 1050px) {
    width: 85%;
  }
`;

const StUserInfoSection = styled.section`
  display: flex;
  align-items: center;
  align-self: start;
  margin: 1.8125rem 0 0.5625rem 0.625rem;
  & figure {
    width: 2.9375rem;
    height: 2.9375rem;
    border-radius: 50%;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  & span {
    margin-left: 1rem;
    font-size: 1.563rem;
  }

  @media (max-width: 1050px) {
    & figure {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }
    & span {
      margin-left: 1rem;
      font-size: 1rem;
    }
  }
`;

const StVideoSection = styled.section`
  position: relative;
  width: 100%;
  padding-bottom: 45%;

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  & button {
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: -1.8rem;
    background: none;
    transform: translate(-100%, 0);
    color: var(--mainOrange);
    padding: unset;
  }

  & button:last-child {
    left: unset;
    right: -1.8rem;
    transform: translate(100%, 0);
  }

  @media (max-width: 1050px) {
    & button {
      left: 0;
      transform: translate(0, 0);
    }

    & button:last-child {
      transform: translate(0, 0);
      right: 0;
    }
  }
`;

const StEditDeleteArea = styled.section`
  display: flex;
  align-items: center;
  margin-top: 0.3125rem;
  & > button {
    background: none;
    color: var(--mainWhite);
  }
  & > button:hover {
    color: var(--mainOrange);
  }
`;

const StSubLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  margin-top: 3.0625rem;
  padding-bottom: 1.125rem;
  border-bottom: 1px solid #ff683b;
  & h3 {
    font-size: 2.441rem;
    max-width: 55%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  & span {
    font-size: 1.25rem;
    text-align: right;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  @media (max-width: 1050px) {
    align-items: center;
    & h3 {
      font-size: 1.5rem;
    }
    & span {
      font-size: 0.8rem;
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: end;
      & button {
        zoom: 0.8;
      }
    }
  }
`;

const StContextP = styled.p`
  width: 100%;
  padding: 0 4.5625rem;
  font-size: 1.25rem;
  @media (max-width: 1050px) {
    padding: 0 3.625rem;
    font-size: 1rem;
  }
`;

export { StContextP, StSubLineWrapper, StDetailPageWrapper, StEditDeleteArea, StVideoSection, StUserInfoSection };
