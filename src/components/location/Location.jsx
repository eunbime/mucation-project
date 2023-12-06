import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Location = () => {
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [info, setInfo] = useState('');
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ lat: '', lng: '' });

  useEffect(() => {
    // 지도 초기 위치 설정 (현재 위치로 고정)
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 현재 위치 얻기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          // 현재 위치 저장
          setCurrentLocation({ ...currentLocation, ...location });

          // 위치 초기 설정
          setState((prev) => ({
            ...prev,
            center: { ...location },
            // 지도 위치 변경시 panto 이용할 지
            isPanto: false,
            level: 5,
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false
      }));
    }
  }, []);

  const getInfo = () => {
    const map = mapRef.current;
    if (!map) return;

    const center = map.getCenter();

    // 지도의 현재 레벨을 얻어옵니다
    const level = map.getLevel();

    // 지도타입을 얻어옵니다
    const mapTypeId = map.getMapTypeId();

    // 지도의 현재 영역을 얻어옵니다
    const bounds = map.getBounds();

    // 영역의 남서쪽 좌표를 얻어옵니다
    const swLatLng = bounds.getSouthWest();

    // 영역의 북동쪽 좌표를 얻어옵니다
    const neLatLng = bounds.getNorthEast();

    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
    // const boundsStr = bounds.toString()

    let message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
    message += '경도 ' + center.getLng() + ' 이고 <br>';
    message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
    message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
    message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
    message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
    setInfo(message);
  };

  console.log(loading, error);

  if (loading) return <div>loading...</div>;
  if (error) return <div>오류가 발생했습니다.</div>;

  return (
    <MapWrapper>
      <Map // 지도를 표시할 Container
        ref={mapRef}
        center={state.center}
        isPanto={state.isPantos}
        style={{
          width: '100%',
          height: '450px'
        }}
        level={state.level} // 지도의 확대 레벨
        onCenterChanged={(map) =>
          setState({
            level: map.getLevel(),
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng()
            }
          })
        }
      >
        <MapMarker
          position={state.center}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          onClick={() => setIsOpen(!isOpen)}
          /** 마커 이미지 커스텀 */
          // image={{
          //   src: 'https://w7.pngwing.com/pngs/800/189/png-transparent-multimedia-music-play-player-song-video-multimedia-controls-solid-icon.png',
          //   size: {
          //     width: 30,
          //     height: 30
          //   }, // 마커이미지의 크기입니다
          //   options: {
          //     offset: {
          //       x: 10,
          //       y: 30
          //     } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          //   }
          // }}
        >
          {isOpen && (
            // onClick 시 게시물 아이디를 받아서 해당 디테일 페이지로 이동
            <div style={{ minWidth: '150px' }} onClick={() => navigate('/detail')}>
              {/* 노래 제목 및 앨범 커버 또는 프리뷰 이미지 가져오기 */}
              <div>
                <img alt="cover" width="50" height="50" />
              </div>
              <div style={{ padding: '5px', color: '#000' }}>노래제목</div>
            </div>
          )}
        </MapMarker>
      </Map>
      <MapButtonBox>
        <button>검색아이콘</button>
        <button onClick={() => setState({ ...state, center: { ...currentLocation } })}>현재위치아이콘</button>
        <input
          type="range"
          defaultValue="5"
          min="1"
          max="10"
          onChange={(e) => {
            mapRef.current.setLevel(e.currentTarget.value, { animate: true });
          }}
        />
      </MapButtonBox>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  border: 1px solid #222;
  background-color: #eee;
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 10;
`;

export default Location;
