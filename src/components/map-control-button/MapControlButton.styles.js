const { default: styled } = require('styled-components');

const StMapButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 0.25rem;
  left: 1rem;
  top: 1rem;
  z-index: 10;
`;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--mainOrange);
  color: var(--mainWhite);
  font-size: 2rem;
`;

export { StMapButtonBox, StButton };
