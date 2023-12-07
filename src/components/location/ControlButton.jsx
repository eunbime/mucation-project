import React, { useState } from 'react';
import { StMapButtonBox } from './Location.styles';

const ControlButton = ({ state, setState, currentLocation, mapRef, map }) => {
  const [searchInput, setSearchInput] = useState('');

  // 키워드로 장소 겁색 및 이동
  const handleToSearch = (e) => {
    e.preventDefault();
    if (!map) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(searchInput, (data, status, _pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new window.kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };

  return (
    <StMapButtonBox>
      <form onSubmit={(e) => handleToSearch(e)}>
        <button onClick={handleToSearch}>검색</button>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </form>
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
