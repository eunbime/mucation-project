import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs, setDoc, getDoc } from 'firebase/firestore';
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
export const signUpEmail = async ({ email, password, nickname }) => {
  console.log(email, password, nickname);
  const response = await createUserWithEmailAndPassword(auth, email, password);
  console.log(response, nickname);
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
  if (!docSnap.data()) return;
  await setDoc(doc(db, 'user', uid), {
    genre: [],
    introduce: ''
  });
};

// 유저 member 데이터 가져오기 (firestore)
export const getUserData = async (uid) => {
  const docSnap = await getDoc(doc(db, 'user', uid));
  // console.log(docSnap.data());
  return docSnap.data();
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
