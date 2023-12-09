import styled from 'styled-components';

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  transition: opacity 0.3s;
  z-index: ${(props) => (props.$visible ? 200 : -100)};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
`;

const StAlertModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 37.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  text-align: center;
  padding: 2rem 0;
  background-color: var(--darkGrayColor);

  transition: opacity 0.3s;
  z-index: ${(props) => (props.$visible ? 210 : -100)};
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  & > button {
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    padding: 0.5rem;
    background: none;
  }

  & h3 {
    font-weight: bold;
    font-size: 1.7rem;
    color: var(--mainOrange);
    padding-bottom: 1rem;
    width: 80%;
    border-bottom: 2px solid var(--mainOrange);
    margin-bottom: 1.5rem;
  }

  & p {
    font-size: 1.3rem;
    color: var(--mainWhite);
  }

  & > section {
    display: flex;
    margin-top: 2rem;
  }

  & > section > button {
    font-size: 1.1rem;
    margin: 0 1.8125rem;
  }
`;

export { StBackDrop, StAlertModalContainer };
