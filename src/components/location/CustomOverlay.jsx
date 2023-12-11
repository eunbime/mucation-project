import React from 'react';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';
import {
  StCustomOverlay,
  StCustomOverlayThumbnail,
  StCustomOverlayInfo,
  StCustomOverlayButton
} from './CustomOverlay.styles';
import { selectedvideo } from '../../redux/modules/seletcedVideoSlice';
import { useDispatch } from 'react-redux';

const CustomOverlay = ({ item, setIsOpenOverlay, mapRef }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleToDetailPage = async () => {
    const bounds = mapRef.current?.getBounds();
    dispatch(selectedvideo(item));
    navigate('/detail', {
      state: bounds
    });
  };

  return (
    <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
      key={`${item.title}-${item.latlng}`}
      // 커스텀 오버레이가 표시될 위치입니다
      position={{ lat: item.lat, lng: item.lng }}
      xAnchor={-0.15}
      yAnchor={0.9}
    >
      <StCustomOverlay style={{ backgroundColor: 'white', color: '#000' }}>
        <StCustomOverlayThumbnail img={item.thumbnail}></StCustomOverlayThumbnail>
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
  );
};

export default CustomOverlay;
