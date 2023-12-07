import styled from 'styled-components';

const StMapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
  position: relative;
`;

const Controlbar = styled.input`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 10;
  width: 20%;
  border-radius: 8px;
  outline: none;
  transition: 450ms ease-in;
  accent-color: var(--mainOrange);
  /* -webkit-appearance: none; */
`;

export { StMapWrapper, Controlbar };
