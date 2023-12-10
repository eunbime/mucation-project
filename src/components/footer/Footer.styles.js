import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StFooterContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  transform: translate(0, 120%);
`;

const StTeamTitle = styled(Link)`
  font-size: x-large;
  font-weight: 700;
  color: var(--mainOrange);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    color: var(--mainWhite);
  }
`;

const StLinkSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const StVelogLinkUl = styled.ul`
  font-size: medium;
  display: flex;
  gap: 0.65rem;
`;

const StVelogLink = styled(Link)`
  color: #555;
  font-size: small;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: var(--mainOrange);
  }
`;

const StCopyright = styled.p`
  font-size: small;
  color: #555;
`;

export { StFooterContainer, StTeamTitle, StLinkSection, StVelogLinkUl, StVelogLink, StCopyright };
