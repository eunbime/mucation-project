import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// POSTS 가져오기
export const getUser = async () => {
  const querySnapshot = await getDocs(collection(db, 'user'));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    return doc.data();
  });
};

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

// 회원가입
export const signUpEmail = async ({ email, password }) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return response;
};

// 로그인
export const loginEmail = async ({ email, password }) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  return response;
};

// 로그아웃
export const logout = async () => {
  const response = await signOut(auth);
  return response;
};

export const authDataCheck = async () => {};

// 구글 소셜 로그인
export const loginGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    console.log(response.user);
  } catch (err) {
    console.log(err);
  }
};

// 사용자 프로필 불러오기 => 로그인 기능 완료되면 수정 해야할수도 있어요!
// 로그인 후 현재 사용자 정보 로컬에 저장
const user = auth.currentUser;
if (user !== null) {
  const nickname = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const uid = user.uid;
  const accessToken = user.accessToken;
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('email', email);
  localStorage.setItem('avatar', photoURL);
  localStorage.setItem('uid', uid);
  localStorage.setItem('accessToken', accessToken);
}
