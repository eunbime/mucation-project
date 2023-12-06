import styled from 'styled-components';

const MapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 10;
`;

export { MapWrapper, MapButtonBox };
