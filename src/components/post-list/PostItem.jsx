import React from 'react';
import { StPostItemWrapper } from './PostItem.styles';
import { useDispatch } from 'react-redux';
import { selectedvideo } from '../../redux/modules/seletcedVideoSlice';
import { useNavigate } from 'react-router-dom';

const PostItem = ({ post }) => {
  // TODO: 디테일 페이지 이동 핸들러 (게시물 아이디 값 사용)

  const dispatch = useDispatch();

  const navigation = useNavigate();

  const selectedMovieToDatail = (video) => {
    // console.log('비디오', video);
    dispatch(selectedvideo(video));

    navigation('/detail');
  };

  return (
    <StPostItemWrapper onClick={()=>selectedMovieToDatail(post)}>
      <img src={post.thumbnail} />
      <h3>{post.title}</h3>
      <h3>{post.date}</h3>
      <h3>{post.nickname}</h3>
      <p>{post.context}</p>
    </StPostItemWrapper>
  );
};

export default PostItem;
