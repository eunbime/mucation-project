import React from 'react';
import { ReactComponent as Github } from '../../styles/img/loginPage/github.svg';
import { Link } from 'react-router-dom';
import {
  StFooterContainer,
  StTeamTitle,
  StLinkSection,
  StVelogLinkUl,
  StVelogLink,
  StCopyright
} from './Footer.styles';

const Footer = () => {
  return (
    <StFooterContainer>
      <StTeamTitle to={'/'}>Mutation</StTeamTitle>
      <StLinkSection>
        <StVelogLinkUl>
          <StVelogLink to={'https://velog.io/@jihyun_j'}>@jihyun_j</StVelogLink>
          <StVelogLink to={'https://velog.io/@dkssud31105'}>@dkssud31105</StVelogLink>
          <StVelogLink to={'https://utd20230926.tistory.com/'}>@utd20230926</StVelogLink>
          <StVelogLink to={'https://velog.io/@eunbi'}>@eunbi</StVelogLink>
          <StVelogLink to={'https://audtjqxx.tistory.com/'}>@audtjqxx</StVelogLink>
        </StVelogLinkUl>
        <StCopyright>Copyright ©2023 MUTATION. All rights reserved.</StCopyright>
      </StLinkSection>
      <Link to={'https://github.com/eunbime/mucation-project'}>
        <Github />
      </Link>
    </StFooterContainer>
  );
};

export default Footer;
