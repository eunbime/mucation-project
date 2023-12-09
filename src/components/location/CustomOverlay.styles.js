import styled from 'styled-components';

const StCustomOverlay = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-content: flex-start;
  color: var(--mainWhite);
  padding: 1rem;
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
    margin-top: 1rem;
    font-size: small;
    white-space: pre-wrap;
    background-color: #eee;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
`;

const StCustomOverlayButton = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  & button {
    background-color: var(--mainOrange);
    color: var(--mainWhite);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: small;
    transition: all 0.3 ease-in-out;
    opacity: 100%;
    width: 100%;

    &:hover {
      opacity: 80%;
    }

    &:last-child {
      background-color: var(--subColor);
    }
  }
`;

export { StCustomOverlay, StCustomOverlayThumbnail, StCustomOverlayInfo, StCustomOverlayButton };
