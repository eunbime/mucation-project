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

const StWriteModalSearch = styled.button`
  font-size: 1.25rem;
  padding: 0.5625rem 2.125rem;
  margin-left: 5px;
  font-weight: bold;
  border-radius: 5px;
  background: var(--mainOrange);
  color: var(--mainWhite);
`;
const StWriteModalSearchInput = styled.input`
  font-size: 1.25rem;
  padding: 0.6825rem 2.125rem;
  font-weight: bold;
  border-radius: 5px;
`;
const StWriteModalSectionBorder = styled.div`
  border: 1px solid #7270ff;
`;

const StWriteModalNonSearch = styled.div`
  margin-top: 30px;
`;

const StWriteModalImg = styled.img``;
export {
  StWriteModalImg,
  StWriteModalSectionBorder,
  StWriteModalSearch,
  StWriteModalSearchInput,
  StWriteModalNonSearch
};
