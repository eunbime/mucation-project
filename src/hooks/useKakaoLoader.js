import React, { useEffect, useState } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const useKakaoLoader = () => {
  const [loading, error] = useKakaoLoader({
    appkey: 'e63170e75fde04a415750e5958b42634' // 발급 받은 APPKEY
    // ...options // 추가 옵션
  });

  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });

  useEffect(() => {
    // 지도 초기 위치 설정 (현재 위치로 고정)
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        setState({
          center: { lat: lat, lng: lon },
          // 지도 위치 변경시 panto 이용할 지
          isPanto: false,
          level: 5
        });

        let locPosition = new window.kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

        // 마커와 인포윈도우를 표시합니다
        // displayMarker(locPosition, message);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      let locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..';

      // displayMarker(locPosition, message);
    }
  }, []);

  return (
    // Map 내부에서 loading 상태를 관찰하고 있기 때문에 conditional rendering를 하지 않아도 됩니다.
    <Map // 지도를 표시할 Container
      center={state.center}
      style={{
        // 지도의 크기
        width: '100%',
        height: '450px'
      }}
      level={state.level} // 지도의 확대 레벨
    />
  );
};

export default useKakaoLoader;
