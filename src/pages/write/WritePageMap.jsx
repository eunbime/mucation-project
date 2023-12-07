import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

const MapInfo = () => {
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });
  const mapRef = useRef(null);
  const [info, setInfo] = useState('');
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });
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

  // 위치 정보 가져오기
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

  // 주소 변환
  // 주소-좌표 변환 객체를 생성합니다
  // let map = new window.kakao.maps.Map(mapRef.current, state);
  let geocoder = new window.kakao.maps.services.Geocoder();
  const callback = (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log(result);
    }
  };
  geocoder.coord2Address(state.center.lat, state.center.lng, callback);

  if (error) return <div>오류가 발생했습니다.</div>;

  return (
    <>
      <Map // 지도를 표시할 Container
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
        />
      </Map>
      <button onClick={() => setState({ ...state, center: { ...currentLocation } })}>현재 위치로 설정</button>
      {loading ? (
        <div>지도를 로딩중입니다.</div>
      ) : (
        !!state && (
          <div>
            <p>{'지도 레벨은 ' + state.level + ' 이고'}</p>
            <p>{'중심 좌표는 위도 ' + state.center.lat + ', 경도 ' + state.center.lng + ' 입니다'}</p>
          </div>
        )
      )}
    </>
  );
};

export default MapInfo;
