import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { StMapWrapper } from './Location.styles';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import ControlButton from './ControlButton';

const Location = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });
  const [currentLocation, setCurrentLocation] = useState({ lat: '', lng: '' });
  const [map, setMap] = useState('');

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

  // 게시물에서 필요한 값 추출
  var positions = posts?.map((post) => {
    return {
      title: post.title,
      latlng: new window.kakao.maps.LatLng(post.location._lat, post.location._long)
    };
  });

  for (var i = 0; i < positions?.length; i++) {
    // 마커 이미지 설정
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
      imageSize = new window.kakao.maps.Size(24, 35),
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커 생성
    var marker = new window.kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: positions[i].latlng, // 마커를 표시할 위치
      title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시 됨
      image: markerImage
    });

    // 인포 윈도우 생성
    var infowindow = new window.kakao.maps.InfoWindow({
      content: positions[i].title // 인포윈도우에 표시할 내용
    });

    // console.log(infowindow.getContent());

    // 클릭 이벤트
    window.kakao.maps.event.addListener(marker, 'click', function () {
      alert('디테일 페이지로 이동!');
      navigate('/detail');
    });

    // 마우스 오버 이벤트
    (function (marker, infowindow) {
      // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
      window.kakao.maps.event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
      });

      // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
      window.kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close();
      });
    })(marker, infowindow);
  }

  const handleToCreatePost = () => {
    console.log(state.center);
    // TODO: window confirm
    const answer = window.confirm('작성 페이지로 이동하시겠습니까?');
    if (!answer) return;

    // TODO: 클릭 시 작성 페이지로 현재 좌표 값 갖고 이동
    navigate('/write', {
      state: { ...state.center }
    });
  };

  if (loading || isLoading) return <div>loading...</div>;
  if (error || isError) return <div>오류가 발생했습니다. 🥲</div>;

  return (
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
        onCreate={setMap}
      >
        <MapMarker
          position={state.center}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          onClick={handleToCreatePost} // 클릭 시 작성 페이지로 이동 (현재 좌표 값 갖고 이동)
        ></MapMarker>
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={10} // 클러스터 할 최소 지도 레벨
        >
          {positions.map((pos) => (
            <MapMarker
              key={`${pos.lat}-${pos.lng}`}
              position={{
                lat: pos.lat,
                lng: pos.lng
              }}
            />
          ))}
        </MarkerClusterer>
      </Map>

      <ControlButton state={state} setState={setState} currentLocation={currentLocation} mapRef={mapRef} map={map} />
    </StMapWrapper>
  );
};

export default Location;
