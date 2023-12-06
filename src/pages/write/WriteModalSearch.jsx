import React, { useEffect, useState } from 'react';
import youtubeApi from '../../axios/youtubeApi';
import useInput from 'hooks/useInput';
import axios from 'axios';

const WriteModalSearch = ({ selectVideo, setSelectVideo, toggleModal }) => {
  const [value, handler] = useInput('');
  // console.log('서치부분',setSelectVideo)
  const [search, setSearch] = useState('');
  //유투브 검색

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
    // closeModal(); // Close the modal
  };

  return (
    <div>
      <input type="text" onChange={handler} />
      <p>ddddd {selectVideo}</p>
      <button onClick={getSearchHandler}>찾기</button>

      {search.length > 0 ? (
        search.map((item) => (
          <section key={item.id.videoId}>
            <div onClick={() => handleVideoSelect(item.id.videoId)}>
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
