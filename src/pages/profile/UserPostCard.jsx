import React, { useEffect, useState } from 'react';
import {
  StUserSharedPostsContainer,
  StPostCard,
  StThumnail,
  StPostInfoWrapper,
  StPostTitle,
  StPostContent,
  StThumnailAndInfo
} from './profile.styles';
import { useQuery } from 'react-query';
import { getCurrentUserPost } from '../../axios/firebaseApi.js';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { selectedvideo } from '../../redux/modules/seletcedVideoSlice';

const UserPostCard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentUser } = useAuth();

  const { data: posts } = useQuery(['posts'], getCurrentUserPost);

  const filtered = posts?.filter((post) => post.uid === currentUser.uid);

  // 파이어베이스 날짜 변환
  const [formattedDate, setFormattedDate] = useState([]);

  useEffect(() => {
    const convertFirebaseNumberToDate = () => {
      posts?.map((num) => {
        const number = parseInt(num.date);
        const dateObject = new Date(number);
        // 예시: "2023-01-01 12:34:56" 형식으로 표시
        const formattedDateString = dateObject.toLocaleString();
        setFormattedDate(formattedDateString);
      });
    };
    convertFirebaseNumberToDate();
  }, []);

  const handleToDetailPage = (post) => {
    dispatch(selectedvideo(post));
    navigate('/detail');
  };

  return (
    <StUserSharedPostsContainer>
      {filtered?.map((post) => {
        return (
          <StPostCard key={post.id}>
            <StThumnailAndInfo>
              <StThumnail src={post.thumbnail}></StThumnail>
              <StPostInfoWrapper>
                <StPostTitle>{post.title}</StPostTitle>
                <StPostContent>{post.context}</StPostContent>
                <span>{formattedDate}</span>
              </StPostInfoWrapper>
            </StThumnailAndInfo>
            <Button
              text={'상세보기'}
              handler={() => {
                handleToDetailPage(post);
              }}
            ></Button>
          </StPostCard>
        );
      })}
    </StUserSharedPostsContainer>
  );
};

export default UserPostCard;
