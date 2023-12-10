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

const StModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
  overflow-y: auto;
`;

const StModalContent = styled.div`
  background-color: #222;
  padding: 20px;
  width: 100vh;
  height: 70vh;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  border: 1px solid #ff683b;
`;

const StModalClose = styled.span`
  color: #ff683b;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #ff683b;
    text-decoration: none;
  }
`;
export { StModalClose, StModalContent, StModalOverlay };
