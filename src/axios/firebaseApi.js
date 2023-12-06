import { getDocs, getFirestore, collection } from 'firebase/firestore';
import { db } from 'firebase.js';

const getPosts = async () => {
  const snapshot = await getDocs(collection(db, 'music'));
  console.log(snapshot);
  snapshot.forEach((doc) => {
    return doc.data();
  });
};

export default getPosts;
