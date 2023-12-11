import styled from 'styled-components';

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
