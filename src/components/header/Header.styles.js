import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5rem;
  padding: 1rem 1.65rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: var(--subColor);
  h1 {
    color: var(--mainWhite);
  }
`;

const StHeaderTitle = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: large;
`;

const StHeaderButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StHeaderProfile = styled.button`
  background: none;
  position: relative;
  & figure {
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    border-radius: 50%;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & span {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -0.5rem;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
    opacity: 0;
    transition: 0.3s;
    background-color: var(--mainOrange);
    color: var(--mainWhite);
    font-weight: bold;
  }

  &:hover {
    & span {
      opacity: 1;
      transform: translate(0, 100%);
    }
  }
`;

export { StHeaderContainer, StHeaderButtonContainer, StHeaderProfile, StHeaderTitle };
