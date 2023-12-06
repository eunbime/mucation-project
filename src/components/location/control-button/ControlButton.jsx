import React from 'react';

const ControlButton = () => {
  return (
    <MapButtonBox>
      <form onSubmit={(e) => handleToSearch(e)}>
        <button onClick={handleToSearch}>검색</button>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </form>
      <button type="button" onClick={() => setState({ ...state, center: { ...currentLocation } })}>
        현재위치아이콘
      </button>
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
  );
};

export default ControlButton;
