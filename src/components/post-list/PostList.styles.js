import styled from 'styled-components';

const StPostSection = styled.section`
  width: 100%;
  margin: 0 auto;
`;

const StPostListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  gap: 1rem;
  overflow-y: auto;
`;

export { StPostSection, StPostListWrapper };
