import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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

// POST 삭제하기
export const deletePost = async (id) => {
  const selectedPost = doc(db, 'music', id);
  await deleteDoc(selectedPost);
};

// 사용자 프로필 불러오기 => 로그인 기능 완료되면 수정 해야할수도 있어요!
// 로그인 후 현재 사용자 정보 로컬에 저장
const auth = getAuth();
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

// signInWithEmailAndPassword(auth, 'test2@test2.com', '123456789')
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
