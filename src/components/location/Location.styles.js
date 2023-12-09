import styled from 'styled-components';

const StMapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Controlbar = styled.input`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 10;
  width: 20%;
  border-radius: 8px;
  outline: none;
  transition: 450ms ease-in;
  accent-color: var(--mainOrange);
  /* -webkit-appearance: none; */
`;

const StCustomOverlay = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-content: flex-start;
  color: var(--mainWhite);
  padding: 1rem;
  /* border: 1px solid #222; */
  border-radius: 0.8rem;
  box-shadow: 0 0 5px 0 #888;
  z-index: 10;
`;

const StCustomOverlayThumbnail = styled.div`
  width: 200px;
  height: 110px;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: -1.2rem;
`;

const StCustomOverlayInfo = styled.section`
  width: 100%;

  & span {
    font-weight: 600;
  }
  & pre {
    margin-top: 0.5rem;
    font-size: small;
    white-space: pre-wrap;
  }
`;

const StCustomOverlayButton = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 0.5rem;

  & button {
    background-color: var(--mainOrange);
    color: var(--mainWhite);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: small;
    transition: all 0.3 ease-in-out;
    opacity: 100%;

    &:hover {
      opacity: 80%;
    }

    &:last-child {
      background-color: var(--subColor);
    }
  }
`;

export {
  StMapWrapper,
  Controlbar,
  StCustomOverlay,
  StCustomOverlayButton,
  StCustomOverlayThumbnail,
  StCustomOverlayInfo
};
