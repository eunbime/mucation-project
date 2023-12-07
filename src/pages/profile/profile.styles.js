import styled from 'styled-components';

// --mainWhite: #fff;
// --mainBlack: #222;
// --mainOrange: #FF683B;
// --bgColor: #171717;
// --subColor: #252525;
// --neonColor: #D9FD79;
// --violetColor: #7270FF;

const StUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
`;

const StAvatar = styled.img`
  background-color: var(--mainWhite);
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
`;

const Nickname = styled.h2`
  color: var(--mainOrange);
  font-size: 1.8rem;
`;

const Email = styled.p`
  font-size: 1rem;
  color: var(--mainWhite);
`;

const Introduce = styled.p`
  color: var(--mainWhite);
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.2;
`;

const FavoriteGenre = styled.span`
  color: var(--violetColor);
  border: 1px solid var(--violetColor);
  padding: 0.4rem 0.8rem;
  border-radius: 5rem;
`;

export {};
