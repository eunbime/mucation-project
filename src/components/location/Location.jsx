import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import { StMapWrapper } from './Location.styles';
import { useQuery } from 'react-query';
import { getPosts } from 'api/posts';
import { useDispatch } from 'react-redux';
import { getLocation } from '../../redux/modules/mapSlice';
import ControlButton from '../map-control-button/MapControlButton';
import MapMarkerClusterer from './MapMarkerClusterer';
import CustomOverlay from './CustomOverlay';
import CustomMarker from './CustomMarker';
import CustomControlBar from '../map-control-button/CustomControlBar';
import useDebounce from 'hooks/useDebounce';
import useAlert from 'hooks/useAlert';

const { kakao } = window;

const Location = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, error] = useKakaoLoader({ appkey: process.env.REACT_APP_KAKAO_MAP_API_KEY });
  const { isLoading, isError, data: posts } = useQuery('posts', getPosts);
  const [state, setState] = useState({ center: { lat: '', lng: '' }, isPanto: false, level: 0 });
  const [currentLocation, setCurrentLocation] = useState({ lat: '', lng: '' });
  const [isOpenWindow, setIsOpenWindow] = useState(false);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [level, setLevel] = useState(5);
  const [markerId, setMarkerId] = useState('');
  const mapRef = useRef(null);
  const debouncedState = useDebounce(state.center, 200);
  const { alert, confirm } = useAlert();

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

        // 사용자가 위치 허용을 하지 않았을 때
        (err) => {
          console.log(err.message);
          alert({ title: '알림', message: '위치 동의가 허용되지 않아 현재 위치가 기본 위치로 표시됩니다.' });

          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            center: { lat: 33.450701, lng: 126.570667 },
            isLoading: false
          }));
        }
      );
      // 위치를 가져오는데 실패했을 때
    } else {
      alert({ title: '알림', message: 'geolocation을 사용할수 없어요..' });
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false
      }));
    }
  }, []);

  // 지도 상 실시간 위치 데이터 저장
  useEffect(() => {
    dispatch(getLocation(debouncedState));
  }, [debouncedState]);

  // 게시물에서 필요한 값 추출
  var positions = posts?.map((post) => {
    return {
      id: post.id,
      title: post.title,
      content: post.context,
      thumbnail: post.thumbnail,
      lat: post?.location?.lat,
      lng: post?.location?.lng,
      latlng: new kakao.maps.LatLng(post?.location?.lat, post?.location?.lng)
    };
  });

  // 작성 페이지 이동 핸들러
  const handleToWritePage = async () => {
    const answer = await confirm({ title: '작성 페이지로 이동', message: '지금 위치에서 음악을 공유하시겠습니까?' });
    if (!answer) return;

    // 클릭 시 작성 페이지로 현재 좌표 값 갖고 이동
    navigate('/write/write', {
      state: { ...state.center }
    });
  };

  const filteredPosition = positions?.filter((position) => {
    return position.id === markerId;
  });

  if (loading && isLoading) return <div>지도를 로딩 중입니다...</div>;

  if (error && isError) return <div>지도 오류가 발생했습니다 🥲</div>;

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
          onClick={handleToWritePage} // 클릭 시 작성 페이지로 이동 (현재 좌표 값 갖고 이동)
          onMouseOver={() => setIsOpenWindow(true)}
          onMouseOut={() => setIsOpenWindow(false)}
        >
          {isOpenWindow && (
            <div style={{ padding: '1rem', color: '#222', fontSize: 'small' }}>음악을 공유해주세요!</div>
          )}
        </MapMarker>
        {positions?.map((item, index) => (
          <CustomMarker key={item.id} item={item} setIsOpenOverlay={setIsOpenOverlay} setMarkerId={setMarkerId} />
        ))}

        {/* <MapMarkerClusterer mapRef={mapRef} positions={positions} /> */}
        {filteredPosition?.map((item) => {
          return (
            isOpenOverlay && (
              <CustomOverlay key={item.id} item={item} setIsOpenOverlay={setIsOpenOverlay} mapRef={mapRef} />
            )
          );
        })}
      </Map>
      <ControlButton state={state} setState={setState} currentLocation={currentLocation} mapRef={mapRef} />
      <CustomControlBar mapRef={mapRef} setLevel={setLevel} />
    </StMapWrapper>
  );
};

export default Location;
