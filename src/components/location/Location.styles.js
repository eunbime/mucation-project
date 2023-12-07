import styled from 'styled-components';

const StMapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StMapButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 10;
`;

export { StMapWrapper, StMapButtonBox };
