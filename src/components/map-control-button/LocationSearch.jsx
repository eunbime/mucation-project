import React, { useState } from 'react';
import { StSearchForm, StButton } from './LocationSearch.styles';
import { MdOutlineSearch } from 'react-icons/md';
import useAlert from 'hooks/useAlert';

const { kakao } = window;

const LocationSearch = ({ mapRef }) => {
  const [searchInput, setSearchInput] = useState('');
  const [isOpenInput, setIsOpenInput] = useState(false);
  const { alert, confirm } = useAlert();

  // 키워드로 장소 겁색 및 이동
  const handleToSearch = (e) => {
    e.preventDefault();
    if (!mapRef) return;

    const ps = new kakao.maps.services.Places();

    // 키워드를 입력하지 않았을 때
    if (!searchInput.replace(/^\s+|\s+$/g, '')) {
      alert({ title: '알림', message: '키워드를 입력해주세요!' });
      return false;
    }

    ps.keywordSearch(searchInput, async (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        const searchAlert = await confirm({ title: '위치 이동', message: `${searchInput}(으)로 이동하시겠습니까?` });
        if (!searchAlert) return;
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        mapRef.current.setBounds(bounds);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert({ title: '알림', message: '검색 결과가 존재하지 않습니다.' });
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert({ title: '알림', message: '검색 중에 오류가 발생했습니다.' });
        return;
      }
    });

    setSearchInput('');
    setIsOpenInput(false);
  };

  return (
    <StSearchForm onSubmit={(e) => handleToSearch(e)}>
      <StButton type="button" onClick={() => setIsOpenInput(!isOpenInput)}>
        <MdOutlineSearch />
      </StButton>
      {isOpenInput && (
        <input
          type="text"
          maxLength={20}
          autoFocus
          placeholder="공유하고 싶은 장소를 검색해보세요."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      )}
    </StSearchForm>
  );
};

export default LocationSearch;
