import { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import {
  StMapWrapper,
  Controlbar,
  StCustomOverlay,
  StCustomOverlayButton,
  StCustomOverlayThumbnail,
  StCustomOverlayInfo
} from './Location.styles';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { useDispatch } from 'react-redux';
import { getLocation } from '../../redux/modules/mapSlice';
import ControlButton from '../map-control-button/MapControlButton';
import MapMarkerClusterer from './MapMarkerClusterer';

const { kakao } = window;

const Location = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });
  const [currentLocation, setCurrentLocation] = useState({ lat: '', lng: '' });
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [level, setLevel] = useState(4);
  const [markerId, setMarkerId] = useState('');

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
            level,
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

  useEffect(() => {
    dispatch(getLocation(state.center));
  }, [state.center]);

  // 게시물에서 필요한 값 추출
  var positions = posts?.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.context,
      thumbnail: post.thumbnail,
      latlng: new kakao.maps.LatLng(post?.location?.lat, post?.location?.lng),
      lat: post?.location?.lat,
      lng: post?.location?.lng
    };
  });

  // 작성 페이지 이동 핸들러
  const handleToCreatePost = () => {
    const answer = window.confirm('작성 페이지로 이동하시겠습니까?');
    if (!answer) return;

    // 클릭 시 작성 페이지로 현재 좌표 값 갖고 이동
    navigate('/write', {
      state: { ...state.center }
    });
  };

  const handleToDetailPage = () => {
    const bounds = mapRef.current?.getBounds();
    console.log(bounds);
    alert('디테일 페이지로 이동!');
    navigate('/detail', {
      state: bounds
    });
  };

  const handleCustomOverlay = (id) => {
    setMarkerId(id);
    setIsOpenOverlay(true);
  };

  const filteredPosition = positions?.filter((position) => {
    return position.id === markerId;
  });

  if (loading && isLoading) return <div>loading...</div>;
  if (error && isError) return <div>오류가 발생했습니다... 🥲</div>;

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
      >
        <MapMarker
          position={state.center}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정
          onClick={handleToCreatePost} // 클릭 시 작성 페이지로 이동 (현재 좌표 값 갖고 이동)
          onMouseOver={() => setIsOpenWindow(true)}
          onMouseOut={() => setIsOpenWindow(false)}
        >
          {isOpenWindow && (
            <div style={{ padding: '1rem', color: '#222', fontSize: 'small' }}>음악을 공유해주세요!</div>
          )}
        </MapMarker>
        {positions?.map((item, index) => (
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
        ))}

        <MapMarkerClusterer mapRef={mapRef} positions={positions} />
        {filteredPosition?.map((item) => {
          return (
            isOpenOverlay && (
              <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
                // 커스텀 오버레이가 표시될 위치입니다
                position={{ lat: item.lat, lng: item.lng }}
                xAnchor={-0.15}
                yAnchor={0.9}
              >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}
                <StCustomOverlay style={{ backgroundColor: 'white', color: '#000' }}>
                  <StCustomOverlayThumbnail img={item.thumbnail}>
                    {/* <img src={item.thumbnail} alt="thumbnail" /> */}
                  </StCustomOverlayThumbnail>
                  <StCustomOverlayInfo>
                    <span>{item.title}</span>
                    <pre>{item.content}</pre>
                  </StCustomOverlayInfo>
                  <StCustomOverlayButton>
                    <button onClick={handleToDetailPage}>바로가기</button>
                    <button onClick={() => setIsOpenOverlay(false)}>닫기</button>
                  </StCustomOverlayButton>
                </StCustomOverlay>
              </CustomOverlayMap>
            )
          );
        })}
      </Map>
      <ControlButton state={state} setState={setState} currentLocation={currentLocation} mapRef={mapRef} />
      <Controlbar
        type="range"
        defaultValue="4"
        min="1"
        max="8"
        onChange={(e) => {
          mapRef.current.setLevel(e.currentTarget.value, { animate: true });
          setLevel(mapRef.current.getLevel());
        }}
      />
    </StMapWrapper>
  );
};

export default Location;
