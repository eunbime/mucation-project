import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';

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

// USER 정보 가져오기
const user = auth.currentUser;

export const getUser = async () => {
  const querySnapshot = await getDocs(collection(db, 'user'));
  querySnapshot.forEach((doc) => {
    return doc.data();
  });
};

// USER 정보 업데이트
export const updateUser = async () => {
  const docRef = await addDoc(collection(db, 'user'), {
    // Data
    avatar: user.photoURL,
    email: user.email,
    nickname: user.displayName,
    uid: user.uid
  });
  console.log(docRef.id);
};
