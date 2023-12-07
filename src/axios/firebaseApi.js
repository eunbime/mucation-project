import { addDoc, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.js';

// POSTS 가져오기
export const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, 'music'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    return doc.data();
  });
};

// POST 추가하기
export const addPost = async ({ ...posts }) => {
  const docRef = await addDoc(collection(db, 'music'), {
    // Data
    ...posts
  });
  console.log(docRef.id);
};

// POST 수정하기
export const editPost = async (id) => {
  const selectedPost = doc(db, 'music', id);
  await updateDoc(selectedPost, {
    // Data
  });
};
