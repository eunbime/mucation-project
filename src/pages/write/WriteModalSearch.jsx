import React, { useEffect, useState } from 'react';
import youtubeApi from '../../axios/youtubeApi';
import useInput from 'hooks/useInput';
import axios from 'axios';
import { StWriteModalNonSearch, StWriteModalSearchBtn, StWriteModalSearchInput } from './WriteModalSearch.stlye.js';
import WriteModalSearchItem from './WriteModalSearchItem';

const WriteModalSearch = ({ setSelectVideo, toggleModal }) => {
  const [value, handler] = useInput('');

  const [search, setSearch] = useState('');

  const getSearchHandler = async () => {
    try {
      const response = await axios.get(`${youtubeApi}&q=${value}`);
      setSearch(response.data.items);
    } catch {
      console.error('error', console.error);
    }
  };

  //유투브영상선택&모달닫기
  const handleVideoSelect = (video) => {
    setSelectVideo(video);
    toggleModal();
  };

  // 엔터 키가 눌렸는지 확인
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      getSearchHandler();
    }
  };

  return (
    <div>
      <StWriteModalSearchInput type="text" onChange={handler} onKeyDown={handleKeyPress} />
      <StWriteModalSearchBtn onClick={getSearchHandler}>찾기</StWriteModalSearchBtn>

      {search.length > 0 ? (
        search.map((item) => (
          <WriteModalSearchItem key={item.id.videoId} item={item} handleVideoSelect={handleVideoSelect} />
        ))
      ) : (
        <StWriteModalNonSearch>좋아하는 노래를 검색 해주세요.</StWriteModalNonSearch>
      )}
    </div>
  );
};

export default WriteModalSearch;
