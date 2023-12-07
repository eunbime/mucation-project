import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import axios from 'axios';

// post 가져오기
const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'posts'));
  const initialPosts = [];
  querySnapshot.forEach((doc) => {
    initialPosts.push({ id: doc.id, ...doc.data() });
  });

  return initialPosts;
};

// post 추가하기
const addPost = async (newPost) => {
  await axios.post('', newPost);
};

export { getPosts, addPost };
