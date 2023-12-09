import React from 'react';
import { StMapButtonBox, StButton } from './MapControlButton.styles';
import { MdMyLocation } from 'react-icons/md';
import LocationSearch from './LocationSearch';

const MapControlButton = ({ state, setState, currentLocation, mapRef }) => {
  return (
    <StMapButtonBox>
      <LocationSearch mapRef={mapRef} />
      <StButton type="button" onClick={() => setState({ ...state, center: { ...currentLocation } })}>
        <MdMyLocation />
      </StButton>
    </StMapButtonBox>
  );
};

export default MapControlButton;
