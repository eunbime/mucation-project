import axios from 'axios';

// post 가져오기
const getPosts = async () => {
  const { data } = await axios.get('');
  return data;
};

// post 추가하기
const addPost = async (newPost) => {
  await axios.post('', newPost);
};

export { getPosts, addPost };
