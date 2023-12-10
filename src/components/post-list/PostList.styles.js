import styled from 'styled-components';

const StPostSection = styled.section`
  width: 100%;
  margin: 0 auto;
`;

const StPostListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
  gap: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const NotFoundPost = styled.div`
  background-color: var(--subColor);
  padding: 3rem;

  & p {
    font-size: large;
    text-align: center;
  }
`;

export { StPostSection, StPostListWrapper, NotFoundPost };
