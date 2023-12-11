import ControlButton from 'components/map-control-button/MapControlButton';
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { StMapWrapper, StAddressBox } from './WritePageMap.styles';
import { useLocation } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';

const { kakao } = window;

const MapInfo = ({ setState, state, mode }) => {
  const mapRef = useRef();

  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });

  const [currentLocation, setCurrentLocation] = useState({ lat: '', lng: '' });

  const [address, setAddress] = useState('');

  const location = useLocation();

  const passedState = location.state;

  const datas = useSelector((state) => state.currentVideoSlice.videoInfo);

  useEffect(() => {
    // 지도 초기 위치 설정
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
          // 메인 페이지에서 전달된 위치가 존재한다면
          if (passedState) {
            setState((prev) => ({
              ...prev,
              center: { lat: passedState.lat, lng: passedState.lng },
              isPanto: false,
              level: 5,
              isLoading: false
            }));
          } else {
            // 전달값이 없다면 기본적으로 현재 위치 설정
            setState((prev) => ({
              ...prev,
              center: mode === 'edit' ? datas?.location : { ...location },
              // 지도 위치 변경시 panto 이용할 지
              isPanto: false,
              level: 5,
              isLoading: false
            }));
          }
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

  useEffect(() => {
    function getKakaoMapAddress(latitude, longitude) {
      // 카카오맵 API 초기화
      kakao.maps.load(() => {
        // 좌표를 주소로 변환하는 Geocoder 객체 생성
        const geocoder = new kakao.maps.services.Geocoder();

        // 좌표 객체 생성
        const coord = new kakao.maps.LatLng(latitude, longitude);

        // 좌표를 주소로 변환
        geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
          if (status === kakao.maps.services.Status.OK && result.length > 0) {
            // 주소 변환 성공
            const resultAddress = result[0].address.address_name;
            setAddress(resultAddress);
          } else {
            // 주소 변환 실패 또는 주소가 없을 경우
            console.error('주소 변환 실패 또는 주소가 없음');
          }
        });
      });
    }
    getKakaoMapAddress(state.center.lat, state.center.lng);
  }, [state.center]);

  if (loading) return <div>loading...</div>;

  if (error) return <div>오류가 발생했습니다.</div>;

  return (
    <>
      <StMapWrapper>
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
          />
        </Map>
        <ControlButton state={state} setState={setState} currentLocation={currentLocation} mapRef={mapRef} />
      </StMapWrapper>
      {!!state && (
        <StAddressBox>
          <p>{'현재 지정한 위치는 ' + address + ' 입니다.'}</p>
        </StAddressBox>
      )}
    </>
  );
};

export default MapInfo;
