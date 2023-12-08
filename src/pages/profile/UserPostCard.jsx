import React, { useEffect, useState } from 'react';
import { query, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import {
  StUserSharedPostsContainer,
  StPostCard,
  StThumnail,
  StPostInfoWrapper,
  StPostTitle,
  StPostContent
} from './profile.styles';
import { deletePost } from '../../axios/firebaseApi.js';

const UserPostCard = () => {
  const [userPost, setUserPosts] = useState([]);
  const firebaseUID = localStorage.getItem('uid');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const q = query(collection(db, 'music'));
        const querySnapshot = await getDocs(q);

        const initialPosts = [];
        querySnapshot.forEach((post) => {
          const data = { id: post.id, ...post.data() };
          initialPosts.push(data);
        });

        setUserPosts(initialPosts?.filter((el) => el.uid === firebaseUID));
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostData();
  }, []);

  const onClickDeletePost = (id) => {
    // 삭제 후 리랜더링 필요
    deletePost(id);
  };

  return (
    <StUserSharedPostsContainer>
      {userPost.map((post) => {
        return (
          <StPostCard key={post.id}>
            <StThumnail></StThumnail>
            <StPostInfoWrapper>
              <StPostTitle>{post.title}</StPostTitle>
              <StPostContent>{post.context}</StPostContent>
              <p>{post.date}</p>
            </StPostInfoWrapper>
            <button>상세보기</button>
            <button onClick={() => onClickDeletePost(post.id)}>삭제</button>
          </StPostCard>
        );
      })}
    </StUserSharedPostsContainer>
  );
};

export default UserPostCard;
