import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs, setDoc, getDoc, query } from 'firebase/firestore';

import { db, auth } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';

// POST 추가하기
export const addPost = async ({ ...posts }) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    // Data
    ...posts
  });
};

// POST 수정하기
export const editPost = async ({ id, data }) => {
  const selectedPost = doc(db, 'posts', id);
  await updateDoc(selectedPost, data);
};

// POST 삭제하기
export const deletePost = async (id) => {
  const selectedPost = doc(db, 'posts', id);
  await deleteDoc(selectedPost);
};

// 회원가입
export const signUpEmail = async ({ email, password, nickname }) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);
  return { response, nickname };
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
  return response;
};

// userProfile 업데이트
export const profileUpdate = async (nickname) => {
  await updateProfile(auth.currentUser, {
    displayName: nickname
  });
};

// profile 정보
// 회원가입시 유저 uid로 firestore doc 추가
export const setUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, 'user', uid));
  if (docSnap.data()) return;
  await setDoc(doc(db, 'user', uid), {
    genre: [],
    introduce: ''
  });
};

// 유저 member 데이터 가져오기 (firestore)
export const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, 'user', uid));
  return docSnap.data();
};

// 현재 사용자의 포스트만 가져오기
export const getCurrentUserPost = async () => {
  const q = query(collection(db, 'posts'));
  const querySnapshot = await getDocs(q);
  const initialPosts = [];
  querySnapshot.forEach((post) => {
    const data = { id: post.id, ...post.data() };
    initialPosts.push(data);
  });
  return initialPosts;
};

// 사용자정 정보 가져오기
export const getUserInfo = async (uid) => {
  const docRef = doc(db, 'user', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
  }
};

// 유저 프로필 업데이트
export const userProfileUpdate = async (nickname, photoURL) => {
  const update = updateProfile(auth.currentUser, {
    displayName: nickname,
    photoURL
  });
  return update;
};

// 파이어베이스 posts안에 nickname & userPhoto 업데이트
export const updatePostsData = async (id, nickname, photoURL) => {
  const docRef = doc(db, 'posts', id);
  await updateDoc(docRef, {
    nickname,
    photoURL
  });
};
