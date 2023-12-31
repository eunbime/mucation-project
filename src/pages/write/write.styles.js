import styled from 'styled-components';

const StWriteContainer = styled.div`
  padding-top: 10.625rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 65.625rem;
  margin: auto;

  @media (max-width: 1050px) {
    width: 90%;
  }
`;

const StWriteBtnArea = styled.div`
  margin-bottom: 1rem;
  & button {
    margin: 0 1rem;
  }
`;

const StContextSection = styled.section`
  width: 100%;
  height: 10rem;
  font-size: 1.25rem;
  margin: 0 0 2rem 0;

  & textarea {
    font-family: inherit;
    font-size: inherit;
    padding: 1.25rem;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    border: 1px solid var(--mainWhite);
    background-color: transparent;
    color: var(--mainWhite);
    &:focus {
      color: var(--mainOrange);
      border-color: var(--mainOrange);
    }
  }

  @media (max-width: 650px) {
    font-size: 1rem;
  }
`;

const StTitleSection = styled.section`
  position: relative;
  width: 100%;
  height: 3.4375rem;
  margin: 2.625rem 0 2.125rem 0;
  color: var(--mainWhite);
  border-bottom: 1px solid var(--mainWhite);
  font-size: 2.441rem;

  & label {
    font-weight: bold;
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    height: 70%;
    transform: translate(0, -50%);
    background-color: transparent;
  }
  & input {
    color: inherit;
    font-size: inherit;
    padding: 0 1em 0 2.5em;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
  }

  &:focus-within {
    color: var(--mainOrange);
    border-color: var(--mainOrange);
  }

  @media (max-width: 650px) {
    font-size: 1.5rem;
  }
`;

const StSelectVideoBtn = styled.button`
  right: unset !important;
  transform: unset !important;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: none;
  cursor: pointer;
  font-size: 2rem;
  border: 1px solid var(--mainOrange);
  border-radius: 10px;
  color: var(--mainWhite);
  background-color: transparent;
`;

const StVideoSection = styled.section`
  position: relative;
  width: 100%;
  padding-bottom: 45%;

  & button {
    position: absolute;
    right: 0;
    top: -0.625rem;
    transform: translate(0, -100%);
  }

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

export { StWriteContainer, StWriteBtnArea, StContextSection, StTitleSection, StSelectVideoBtn, StVideoSection };
