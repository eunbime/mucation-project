import styled from 'styled-components';
/* styled components
상위폴더명.styles.js 형식의 styled components 파일만들어서 사용
St{기능}{스타일정보} 형식의 이름 컨벤션 맞추기 */

/* 모달 스타일 */
/* // --mainWhite: #fff;
// --mainBlack: #222;
// --mainOrange: #FF683B;
// --bgColor: #171717;
// --subColor: #252525;
// --neonColor: #D9FD79;
// --violetColor: #7270FF; */

const StWriteModalSearchBtn = styled.button`
  font-size: 1.25rem;
  padding: 0.5625rem 2.125rem;
  margin-left: 5px;
  font-weight: bold;
  border-radius: 5px;
  background: var(--mainOrange);
  color: var(--mainWhite);
  &:hover {
    background: var(--mainOrange);
    color: var(--mainWhite);
    border-color: var(--mainWhite);
  }

  @media (min-width: 650px) {
    font-size: medium;
    padding: 0.65rem 1.25rem;
    height: 100%;

  }
`;
const StWriteModalSearchInput = styled.input`
  font-size: 1.25rem;
  padding: 0.6825rem 2.125rem;
  font-weight: bold;
  border-radius: 5px;
  width: 50%;

  @media (min-width: 650px) {
    font-size: medium;
    padding: 0.65rem 1.25rem;
    height: 100%;
    width: 30%;
  }
`;
const StWriteModalSectionBorder = styled.div`
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

const StWriteModalNonSearch = styled.div`
  margin-top: 30px;
`;

const StWriteModalImg = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
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

const StInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
  transition: all 0.3s ease-in-out;

  @media (min-width: 1050px) {
    gap: 2rem;
  }
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

export {
  StPostTitle,
  StInfoBox,
  StThumbnailBox,
  StWriteModalImg,
  StWriteModalSectionBorder,
  StWriteModalSearchBtn,
  StWriteModalSearchInput,
  StWriteModalNonSearch
};
