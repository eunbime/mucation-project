import { addDoc, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getAuth } from 'firebase/auth';

// POST 추가하기
export const addPost = async ({ ...posts }) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    // Data
    ...posts
  });
  console.log(docRef.id);
};

// POST 수정하기
export const editPost = async (id) => {
  const selectedPost = doc(db, 'posts', id);
  await updateDoc(selectedPost, {
    // Data
  });
};

// POST 삭제하기
export const deletePost = async (id) => {
  const selectedPost = doc(db, 'posts', id);
  await deleteDoc(selectedPost);
};

// 사용자 프로필 불러오기 => 로그인 기능 완료되면 수정 해야할수도 있어요!
// 로그인 후 현재 사용자 정보 로컬에 저장
const auth = getAuth();
const user = auth.currentUser;
if (user !== null) {
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const uid = user.uid;
  const accessToken = user.accessToken;
  localStorage.setItem('displayName', displayName);
  localStorage.setItem('email', email);
  localStorage.setItem('photoURL', photoURL);
  localStorage.setItem('uid', uid);
  localStorage.setItem('accessToken', accessToken);
}
