import React, { useRef, useState } from 'react';
import { StMapButtonBox } from './Location.styles';

// head에 작성한 Kakao API 불러오기
const { kakao } = window;

const ControlButton = ({ state, setState, currentLocation, mapRef }) => {
  const listRef = useRef();
  const [searchInput, setSearchInput] = useState('');

  // 키워드로 장소 겁색 및 이동
  const handleToSearch = (e) => {
    e.preventDefault();
    if (!mapRef) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchInput, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        // map.setBounds(bounds);
        mapRef.current.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    });
  };

  // placeSearchCb

  return (
    <StMapButtonBox>
      <form onSubmit={(e) => handleToSearch(e)}>
        <button onClick={handleToSearch}>검색</button>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </form>
      <ul ref={listRef}>placeList</ul>
      <button type="button" onClick={() => setState({ ...state, center: { ...currentLocation } })}>
        현재위치아이콘
      </button>
      <input
        type="range"
        defaultValue="5"
        min="1"
        max="10"
        onChange={(e) => {
          mapRef.current.setLevel(e.currentTarget.value, { animate: true });
        }}
      />
    </StMapButtonBox>
  );
};

export default ControlButton;
