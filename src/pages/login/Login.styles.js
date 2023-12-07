import styled from 'styled-components';

const StLoginPageContainer = styled.div`
  margin-top: 11.9375rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & h1 {
    font-size: 4rem;
    color: var(--mainOrange);
    font-weight: bold;
    margin-bottom: 4rem;
  }
  & a {
    margin: 2.875rem 0;
    color: var(--mainWhite);
    & span {
      color: var(--mainOrange);
    }
  }
`;

const StLoginPageInputForm = styled.form`
  width: 27rem;
  display: flex;
  flex-direction: column;
  & button {
    margin-top: 2.875rem;
  }
`;

const StLoginPageInputSection = styled.section`
  position: relative;
  font-size: 1.563rem;
  width: 100%;
  & input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: inherit;
    font-size: inherit;
    padding-bottom: 0.5625rem;
    border-bottom: 1px solid var(--mainWhite);

    &:focus {
      color: var(--mainOrange);
      border-color: var(--mainOrange);
      &::placeholder {
        color: var(--mainOrange);
      }
    }
  }

  & + section {
    margin-top: 2.875rem;
  }
`;
export { StLoginPageContainer, StLoginPageInputForm, StLoginPageInputSection };
