import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getAuth,
  updateProfile
} from 'firebase/auth';
import { useAuth } from 'hooks/useAuth.js';
import { current } from '@reduxjs/toolkit';

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

// 소셜 로그인
export const socialLogin = async (mode) => {
  let provider;
  switch (mode) {
    case 'google':
      provider = new GoogleAuthProvider();
      break;
    case 'github':
      provider = new GithubAuthProvider();
      break;
    default:
      break;
  }
  const response = await signInWithPopup(auth, provider);
  console.log(response.user);
};

// 현재 사용자의 포스트만 가져오기
export const getCurrentUserPost = async () => {
  const q = query(collection(db, 'posts').whereField('uid', '==', auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  const initialPosts = [];
  querySnapshot.forEach((post) => {
    const data = { id: post.id, ...post.data() };
    initialPosts.push(data);
  });
  return initialPosts;
};

// 사용자정 정보 가져오기
export const getUserInfo = async () => {
  const querySnapshot = await getDocs(collection(db, 'user'));
  const userDate = [];
  querySnapshot.forEach((doc) => {
    userDate.push({ id: doc.id, ...doc.data() });
  });

  return userDate;
};

// USER 정보 업데이트
export const updateUser = async () => {
  const docRef = await addDoc(collection(db, 'user'), {
    avatar: auth.photoURL,
    email: auth.email,
    nickname: auth.displayName,
    uid: auth.uid
  });
  return docRef;
};

// 유저 프로필 업데이트
export const userProfileUpdate = async (nickname, photoURL) => {
  const update = updateProfile(auth.currentUser, {
    displayName: nickname,
    photoURL
  });

  return update;
};
