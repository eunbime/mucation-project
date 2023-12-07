import React, { useEffect, useState } from 'react';
import youtubeApi from '../../axios/youtubeApi';
import useInput from 'hooks/useInput';
import axios from 'axios';

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

  return (
    <div>
      <input type="text" onChange={handler} />
      <button onClick={getSearchHandler}>찾기</button>

      {search.length > 0 ? (
        search.map((item) => (
          <section key={item.id.videoId}>
            <div
              onClick={() =>
                handleVideoSelect({ videoId: item.id.videoId, thumbnail: item.snippet.thumbnails.default.url })
              }
            >
              <div>타이틀: {item.snippet.title}</div>
              <div id={item.id.videoId}></div>

              <img src={item.snippet.thumbnails.default.url} alt="앨범이미지" />
            </div>
          </section>
        ))
      ) : (
        <div>좋아하는 노래를 검색하고 클릭 해주세요.</div>
      )}
    </div>
  );
};

export default WriteModalSearch;
