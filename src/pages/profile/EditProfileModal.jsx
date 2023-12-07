import React, { useState } from 'react';
// import { saveUserInformation } from '../../axios/firebaseApi.js';

const EditProfileModal = () => {
  const [userIntro, setUserIntro] = useState('');
  const [userInterest, setUserInterest] = useState([]);

  const userIntroOnChange = (e) => {
    setUserIntro(e.target.value);
  };

  const userInterestOnChange = (e) => {
    setUserInterest(...userInterest, e.target.value);
  };

  return (
    <div>
      <form>
        <input type="file" />

        <label htmlFor=""></label>
        <input type="text" placeholder="닉네임 정보" />

        <label htmlFor=""></label>
        <input type="text" placeholder="소개정보" value={userIntro} onChange={userIntroOnChange} />

        <label htmlFor=""></label>
        <input type="text" placeholder="관심 장르" value={userInterest} onChange={userInterestOnChange} />

        <button>제출</button>
      </form>
    </div>
  );
};

export default EditProfileModal;
