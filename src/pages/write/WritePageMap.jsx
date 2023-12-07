import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

const MapInfo = ({ setState, state }) => {
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });
  const mapRef = useRef(null);
  const [info, setInfo] = useState('');
  // const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });
  const [currentLocation, setCurrentLocation] = useState({ lat: '', lng: '' });

  useEffect(() => {
    // 지도 초기 위치 설정 (현재 위치로 고정)
    // TODO: 메인페이지에서 값 가져올 시 초기값으로 지정
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

  // 좌표로 주소 변환
  // 지도를 생성합니다
  const convertLocation = (lng, lat) => {
    const map = mapRef.current;
    if (!map) return;

    // 주소-좌표 변환 객체를 생성합니다
    let geocoder = new window.kakao.maps.services.Geocoder();

    // // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchDetailAddrFromCoords(map.getCenter(), displayCenterInfo);

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === 'H') {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }

    // // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    // window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    //   searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
    //     if (status === window.kakao.maps.services.Status.OK) {
    //       var detailAddr = !!result[0].road_address
    //         ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
    //         : '';
    //       detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

    //       var content = '<div class="bAddr">' + '<span class="title">법정동 주소정보</span>' + detailAddr + '</div>';

    //       // 마커를 클릭한 위치에 표시합니다
    //       marker.setPosition(mouseEvent.latLng);
    //       marker.setMap(map);

    //       // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
    //       infowindow.setContent(content);
    //       infowindow.open(map, marker);
    //     }
    //   });
    // });

    // // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    // window.kakao.maps.event.addListener(map, 'idle', function () {
    //   searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    // });
  };

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
