import styled from 'styled-components';

// 수정 프로필 모달
const StUserProfileEditModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const StUserInteresteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
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
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  cursor: pointer;
`;

const StFileUploadInput = styled.input``;

const StLabel = styled.label``;

const StInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: none;
  padding-bottom: 0.5625rem;
  border-bottom: 1px solid var(--mainWhite);
  outline: none;
  color: var(--mainWhite);

  &:focus {
    color: var(--mainOrange);
    border-color: var(--mainOrange);
    &::placeholder {
      color: var(--mainOrange);
    }
  }
`;

export {
  StUserProfileEditModalContainer,
  StUserProfileEditModalForm,
  StUserProfilePhoto,
  StFileUploadInput,
  StUserInteresteWrapper,
  StInput,
  StLabel,
  StFavoriteGenre
};
