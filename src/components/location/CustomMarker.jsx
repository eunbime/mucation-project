import React from 'react';
import { MapMarker } from 'react-kakao-maps-sdk';

const CustomMarker = ({ item, setIsOpenOverlay, setMarkerId }) => {
  const handleCustomOverlay = (id) => {
    setMarkerId(id);
    setIsOpenOverlay(true);
  };
  return (
    <MapMarker
      key={`${item.title}-${item.latlng}`}
      position={{ lat: item.lat, lng: item.lng }}
      image={{
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
        size: {
          width: 24,
          height: 35
        } // 마커이미지의 크기입니다
      }}
      title={item.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      onClick={() => handleCustomOverlay(item.id)}
    />
  );
};

export default CustomMarker;
