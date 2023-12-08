import React, { useEffect, useState } from 'react';
import youtubeApi from '../../axios/youtubeApi';
import useInput from 'hooks/useInput';
import axios from 'axios';
import {
  StWriteModalImg,
  StWriteModalNonSearch,
  StWriteModalSearch,
  StWriteModalSearchInput,
  StWriteModalSectionBorder
} from './WriteModalSearch.stlye.js';

const WriteModalSearch = ({ selectVideo, setSelectVideo, toggleModal }) => {
  const [value, handler] = useInput('');

  const [search, setSearch] = useState('');

  const getSearchHandler = async () => {
    try {
      const response = await axios.get(`${youtubeApi}&q=${value}`);
      setSearch(response.data.items);
      console.log('response.data.items', response.data.items);
    } catch {
      console.log('error', console.error);
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
      <StWriteModalSearch onClick={getSearchHandler}>찾기</StWriteModalSearch>

      {search.length > 0 ? (
        search.map((item) => (
          <section key={item.id.videoId}>
            <StWriteModalSectionBorder
              onClick={() =>
                handleVideoSelect({ videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.high.url })
              }
            >
              <StWriteModalImg src={item.snippet.thumbnails.high.url} alt="앨범이미지" />
              <div>타이틀: {item.snippet.title}</div>
              <div id={item.id.videoId}></div>
            </StWriteModalSectionBorder>
          </section>
        ))
      ) : (
        <StWriteModalNonSearch>좋아하는 노래를 검색 해주세요.</StWriteModalNonSearch>
      )}
    </div>
  );
};

export default WriteModalSearch;
