import React from 'react';
import { CustomOverlayMap, MarkerClusterer } from 'react-kakao-maps-sdk';

const MapMarkerClusterer = ({ mapRef, positions }) => {
  // 클러스터 클릭 이벤트
  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 1레벨 확대한 레벨
    const level = map.getLevel() - 1;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
    map.setLevel(level, { anchor: cluster.getCenter() });
  };

  return (
    <MarkerClusterer
      averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel={9} // 클러스터 할 최소 지도 레벨
      disableClickZoom={true}
      onClusterclick={onClusterclick}
    >
      {positions?.map((pos, idx) => {
        return (
          <CustomOverlayMap
            key={`${pos.latlng.Ma}-${pos.latlng.La}`}
            position={{
              lat: pos.latlng.Ma,
              lng: pos.latlng.La
            }}
          ></CustomOverlayMap>
        );
      })}
    </MarkerClusterer>
  );
};

export default MapMarkerClusterer;
