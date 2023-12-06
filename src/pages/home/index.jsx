import MusicList from 'components/music-list/MusicList';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Home = () => {
  const mapRef = useRef(null);
  const map = useRef(null);

  // const [map, setMap] = useState('');

  useEffect(() => {
    // 카카오맵 라이브러리를 HTML head에 추가
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=e63170e75fde04a415750e5958b42634&libraries=LIBRARY&autoload=false';
    document.head.appendChild(script);

    // 스크립트가 로드 된 후
    script.onload = () => {
      // 카카오맵이 로드된 후
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          let options = {
            center: new window.kakao.maps.LatLng(37.5642135, 127.0016985),
            level: 5
          };

          map.current = new window.kakao.maps.Map(mapRef.current, options);
          // setMap(new window.kakao.maps.Map(mapRef.current, options));

          // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
          if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function (position) {
              let lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

              let locPosition = new window.kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다

              // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);
            });
          } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

            let locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),
              message = 'geolocation을 사용할수 없어요..';

            displayMarker(locPosition, message);
          }
        }
      });
    };
  }, []);

  const displayMarker = (locPosition, message) => {
    // 마커를 생성합니다
    let marker = new window.kakao.maps.Marker({
      map: map.current,
      position: locPosition
    });

    let iwContent = message, // 인포윈도우에 표시할 내용
      iwRemoveable = true;

    // 인포윈도우를 생성합니다
    let infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable
    });

    // 인포윈도우를 마커위에 표시합니다
    // infowindow.open(map.current, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.current.setCenter(locPosition);
  };

  return (
    <Container>
      <MapSection>
        <MapWrapper>
          <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
        </MapWrapper>
        <MapButtonBox>
          <button>검색아이콘</button>
          <button>현재위치아이콘</button>
          <input
            type="range"
            defaultValue="5"
            min="1"
            max="10"
            onChange={(e) => {
              map.current.setLevel(e.currentTarget.value, { animate: true });
            }}
          />
          <button
            onClick={() => {
              map.current.setMapTypeId(window.kakao.maps.MapTypeId.HYBRID);
            }}
          >
            타입 변경
          </button>
        </MapButtonBox>
      </MapSection>
      <MusicList />
    </Container>
  );
};

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 5rem;
  gap: 2rem;
`;

const MapSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  height: 500px;
  position: relative;
`;

const MapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
`;

const MapButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 10;
`;

export default Home;
