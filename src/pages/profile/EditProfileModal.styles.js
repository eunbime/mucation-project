import styled from 'styled-components';

// 수정 프로필 모달
const StUserProfileEditModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const StUserInteresteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StImageUploadContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StImageButtonValue = styled.div`
  cursor: pointer;
  border: 1px solid var(--mainOrange);
  color: var(--mainOrange);
  padding: 0.5rem;
  border-radius: 5px;
`;

const StImageUploadInput = styled.input`
  display: none;
`;

const StImageUploadButton = styled.button`
  cursor: pointer;
  border: 1px solid var(--mainOrange);
  color: var(--mainWhite);
  background-color: var(--mainOrange);
  padding: 0.5rem;
  border-radius: 5px;
`;

const StUserProfileEditModalForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
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

const StUserProfilePhoto = styled.img`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 1rem;
`;

const StLabel = styled.label``;

const StAddGenreWrapper = styled.div`
  display: flex;
  position: relative;

  & button {
    background-color: transparent;
    color: var(--mainWhite);
    position: absolute;
    font-size: 1.2rem;
    border: 1px solid var(--mainWhite);
    border-radius: 2rem;
    top: 0;
    right: 0;
  }
`;

const StInput = styled.input`
  background-color: transparent;
  width: 20rem;
  border: none;
  padding-bottom: 0.5625rem;
  border-bottom: 1px solid var(--mainWhite);
  outline: none;
  color: var(--mainWhite);
  font-size: 1.3rem;

  &:focus {
    color: var(--mainOrange);
    border-color: var(--mainOrange);
    &::placeholder {
      color: var(--mainOrange);
    }
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export {
  StUserProfileEditModalContainer,
  StUserProfileEditModalForm,
  StUserProfilePhoto,
  StUserInteresteWrapper,
  StInput,
  StLabel,
  StFavoriteGenre,
  StAddGenreWrapper,
  StButtonWrapper,
  StImageUploadInput,
  StImageButtonValue,
  StImageUploadContainer,
  StImageUploadButton
};
